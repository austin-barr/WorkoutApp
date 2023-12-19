// Calendar.js
import React, { useEffect, useState } from 'react';
import cal from './ProgressCalendar.module.css'
import { subMonths, addMonths } from 'date-fns'
import { Button } from 'react-bootstrap';
import WorkoutPopup from "../ProgressPage/WorkoutPopup";
import ScrollableList from '../ScrollableList/ScrollableList';

const Calendar = () => {
  const today = new Date()
  const todayString = today.toLocaleDateString('fr-CA')
  const [currentDate, setCurrentDate] = useState(today);  //currently displayed on calendar
  const [selectedDate, setSelectedDate] = useState(todayString);
  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).toLocaleDateString('fr-CA'));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  const [daysList, setDaysList] = useState(getDaysInMonth(today.getMonth(), today.getFullYear()))
  const [logs, setLogs] = useState({})
  const [clickedLogIndex, setClickedLogIndex] = useState()
  const [selectedLog, setSelectedLog] = useState()
  const [changeToReload, setChangeToReload] = useState(true)


  const getFirstAndLast = (month, year) => {
    const firstDay = new Date(year, month - 1, 1).toLocaleDateString('fr-CA')
    const lastDay = new Date(year, month, 0).toLocaleDateString('fr-CA')

    return [firstDay, lastDay];
  }

  const loadWorkouts = async () => {
    const [first, last] = getFirstAndLast(today.getMonth()+1, today.getFullYear())
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
      console.log('before sort')
      console.log(logsResult)
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
      console.log('after sort')
      console.log(logsResult)
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
    console.log(logs[selectedDate][index])
    setSelectedLog(logs[selectedDate][index])
    console.log(logs[selectedDate][index])
  }

  const handleLogUnselect = (event, index) => {
    console.log(index)
  }

  useEffect(() => {
    loadWorkouts()
  }, [changeToReload])

  const renderDays = () => {
    return daysList.map((date, index) => (
      <div
        data-value={date}
        className={cal.day + " "+
          (date === todayString ? cal.dayToday : "") + " " +
          (date === selectedDate ? cal.daySelected : "")
        }
        onClick={() => handleDayClick(date)}
      >
        <div className={cal.dayNumber}>
          {index+1}
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
  }

  const renderLogDetails = () => {
    return (
      <div className={cal.logDetails}>
        <h2 className={cal.sidePanelHeader}>
          {selectedDate}
        </h2>
        {logs[selectedDate] && 
          <ScrollableList
            items={logs[selectedDate]}
            makeListElement={makeLogListElement}
            setClickedIndex={setClickedLogIndex}
            onSelect={handleLogSelect}
            onUnselect={handleLogUnselect}
            listClass={cal.logList}
          />
        }
        {selectedLog ?
          <div>
            {selectedLog.name}
          </div>
          // workout summary (total time, muscles used)
          // exercise list
          // Edit selected exercuse button
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

  const nextMonth = () => {
    const newDate = addMonths(currentDate, 1)
    setCurrentDate(newDate)
    setDaysList(getDaysInMonth(newDate.getMonth(), newDate.getFullYear()))
    setSelectedDate()
  };

  const prevMonth = () => {
    const newDate = subMonths(currentDate, 1)
    setCurrentDate(newDate)
    setDaysList(getDaysInMonth(newDate.getMonth(), newDate.getFullYear()))
    setSelectedDate()
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
      <div className={cal.sidePanel}>
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
        {clickedLogIndex !== undefined}
      </div>
    </div>
  );
}

export default Calendar;

