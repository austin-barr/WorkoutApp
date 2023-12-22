// Calendar.js
import React, { useEffect, useState } from 'react';
import cal from './ProgressCalendar.module.css'
import { subMonths, addMonths } from 'date-fns'
import { Button } from 'react-bootstrap';
import WorkoutPopup from "../ProgressPage/WorkoutPopup";
import SelectableList from '../SelectableList/SelectableList';
import WorkoutDetailsDisplay from '../WorkoutDetailsDisplay/WorkoutDetailsDisplay';
import { toLocalDate } from '../../utils'

const Calendar = () => {
  const today = new Date()
  const todayString = today.toLocaleDateString('fr-CA')
  const [currentDate, setCurrentDate] = useState(today);  //currently displayed on calendar
  const [selectedDate, setSelectedDate] = useState(todayString);
  const getPrevMonthDays = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const lastMonth = month === 0 ? 11 : month - 1;
    const lastMonthYear = month === 0 ? year - 1 : year;
    const lastMonthDays = new Date(lastMonthYear, lastMonth + 1, 0).getDate();
    const daysFromPreviousMonth = startingDayOfWeek === 0 ? 0 : startingDayOfWeek;
  
    const previousMonthDays = Array.from({ length: daysFromPreviousMonth }, (_, index) =>
      new Date(lastMonthYear, lastMonth, lastMonthDays - daysFromPreviousMonth + index + 1).toLocaleDateString('fr-CA')
    );
    
    return previousMonthDays;
  };
  const getNextMonthDays = (month, year) => {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfWeek = lastDayOfMonth.getDay();
  
    const daysToEndOfWeek = lastDayOfWeek === 6 ? 0 : 6 - lastDayOfWeek;
  
    const nextMonthDays = Array.from({ length: daysToEndOfWeek }, (_, index) =>
      new Date(year, month + 1, index + 1).toLocaleDateString('fr-CA')
    );
    console.log(nextMonthDays)
    return nextMonthDays;
  };
  const getCurMonthDays = (month, year) => {
    const currentMonthDays = Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) =>
      new Date(year, month, index + 1).toLocaleDateString('fr-CA')
    );
    return currentMonthDays
  }
  const [curDaysList, setCurDaysList] = useState(getCurMonthDays(today.getMonth(), today.getFullYear()))
  const [prevDaysList, setPrevDaysList] = useState(getPrevMonthDays(today.getMonth(), today.getFullYear()))
  const [nextDaysList, setNextDaysList] = useState(getNextMonthDays(today.getMonth(), today.getFullYear()))
  const [logs, setLogs] = useState({})
  const [clickedLogIndex, setClickedLogIndex] = useState()
  const [selectedLog, setSelectedLog] = useState()
  const [changeToReload, setChangeToReload] = useState(true)
  const userTimeZone = new Date().toLocaleTimeString([], { timeZoneName: 'short' }).split(' ')[2];

  const loadWorkouts = async () => {
    const allDays = [...prevDaysList, ...curDaysList, ...nextDaysList]
    console.log(allDays)
    const [first, last] = [allDays[0], allDays[allDays.length-1]]
    console.log(first, last)
    const dates = {
      startDate: first,
      endDate: last
    }
    try {
      const logsResponse = await fetch('/api/get/logs', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(dates)
      })

      const logsResult = (await logsResponse.json()).logs
      
      logsResult.sort((a, b) => {
        const aStart = new Date(`${a.date} ${a.startTime}`)
        const bStart = new Date(`${b.date} ${b.startTime}`)
        if (aStart < bStart) {
          return -1
        }
        else {
          return 1
        }
      })
      const logs = {}
      const seen = []
      for (let log of logsResult) {
        if (!(seen.includes(log.date))) {
          seen.push(log.date)
          logs[log.date] = []
        }
        logs[log.date].push(log)
      }
      setLogs(logs)
    }
    catch (err) {
      console.log(err)
    }   
  }

  const makeLogListElement = (log) => {
    return (
      <div className={cal.logListItem}>
        {log.name}: {log.startTime} - {log.endTime}
      </div>
    )
  }

  const handleLogSelect = (event, index) => {
    setSelectedLog(logs[selectedDate][index])
  }

  const handleLogUnselect = (event, index) => {
    setSelectedLog()
  }

  useEffect(() => {
    loadWorkouts()
  }, [changeToReload])

  const renderDays = () => {
    const prevDays = prevDaysList.map((date, index) => (
      <div
        data-value={date}
        className={cal.day + " "+ cal.diffMonthDay +
          (date === todayString ? cal.dayToday : "") + " " +
          (date === selectedDate ? cal.daySelected : "")
        }
        onClick={() => prevMonth(date)}
      >
        <div className={cal.dayNumber}>
          {parseInt(date.split('-')[2])}
        </div>
        <div className={cal.dayLogList}>
          {logs[date] && 
            logs[date].map((log) => (
              <div>
                <div className={cal.logName}>
                  {log.name}
                </div>
                <div className={cal.times}>
                  {log.startTime} - {log.endTime}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    ))
    const curDays = curDaysList.map((date, index) => (
      <div
        data-value={date}
        className={cal.day + " "+
          (date === todayString ? cal.dayToday : "") + " " +
          (date === selectedDate ? cal.daySelected : "")
        }
        onClick={() => handleDayClick(date)}
      >
        <div className={cal.dayNumber}>
          {parseInt(date.split('-')[2])}
        </div>
        <div className={cal.dayLogList}>
          {logs[date] && 
            logs[date].map((log) => (
              <div>
                <div className={cal.logName}>
                  {log.name}
                </div>
                <div className={cal.times}>
                  {log.startTime} - {log.endTime}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    ))
    const nextDays = nextDaysList.map((date, index) => (
      <div
        data-value={date}
        className={cal.day + " "+ cal.diffMonthDay +
          (date === todayString ? cal.dayToday : "") + " " +
          (date === selectedDate ? cal.daySelected : "")
        }
        onClick={() => nextMonth(date)}
      >
        <div className={cal.dayNumber}>
          {parseInt(date.split('-')[2])}
        </div>
        <div className={cal.dayLogList}>
          {logs[date] && 
            logs[date].map((log) => (
              <div>
                <div className={cal.logName}>
                  {log.name}
                </div>
                <div className={cal.times}>
                  {log.startTime} - {log.endTime}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    ))
    return [...prevDays, ...curDays, ...nextDays]
  }

  const renderLogDetails = () => {
    console.log('selected')
    console.log(selectedDate)
    return (
      <div className={cal.logDetails}>
        <h2 className={cal.sidePanelHeader}>
          {toLocalDate(selectedDate)}
        </h2>
        {logs[selectedDate] && 
          <SelectableList
            items={logs[selectedDate]}
            makeListElement={makeLogListElement}
            clickedIndex={clickedLogIndex}
            setClickedIndex={setClickedLogIndex}
            onSelect={handleLogSelect}
            onUnselect={handleLogUnselect}
            listClass={cal.logList}
          />
        }
        {selectedLog ?
          <div>
            <WorkoutDetailsDisplay workout={selectedLog} mode="log"/>
          </div>
        :
          "No logs"
          
        }
      </div>
    )
  }

  const onSave = () => {
    setChangeToReload(!changeToReload)
  }

  const renderEditPopup = () => {
    console.log(selectedLog)
    // log will be the one that is selected in the side panel
    return <WorkoutPopup
      className="btn btn-primary form-control"
      title={`Edit Log: ${selectedLog.name} on ${selectedLog.date}`}
      buttonText={"Edit "+ selectedLog.name}
      workout={selectedLog}
      mode={"edit-log"}
      onSave={onSave}
    />
  }

  const handleDayClick = (date) => {
    console.log(date)
    setSelectedLog()
    if (date !== selectedDate) {
      setSelectedDate(date)
    }
    else {
      setSelectedDate()
    }
  }

  const handleEditLog = () => {
    
  }

  const nextMonth = (clickedDate) => {
    const newDate = addMonths(currentDate, 1)
    console.log(newDate)
    setCurrentDate(newDate)
    setCurDaysList(getCurMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setPrevDaysList(getPrevMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setNextDaysList(getNextMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setSelectedDate(clickedDate ? clickedDate : undefined)
    setSelectedLog()
  };

  const prevMonth = (clickedDate) => {
    const newDate = subMonths(currentDate, 1)
    console.log(newDate)
    setCurrentDate(newDate)
    setCurDaysList(getCurMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setPrevDaysList(getPrevMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setNextDaysList(getNextMonthDays(newDate.getMonth(), newDate.getFullYear()))
    setSelectedDate(clickedDate ? clickedDate : undefined)
    setSelectedLog()
  };

  return (
    <div className={cal.container}>
      <div className={cal.calendar}>
        <div className={cal.calendarHeader}>
          <button onClick={prevMonth}>Prev</button>
          <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth}>Next</button>
        </div>
        <div className={cal.days}>
          {renderDays()}
        </div>
      </div>
      <div className={"form-container "}>
        {selectedDate ? 
          renderLogDetails()
        :
          "Nothing selected"
        }
        {selectedDate ?
          selectedLog && renderEditPopup()
        :
          "No popup"
        }
      </div>
    </div>
  );
}

export default Calendar;

