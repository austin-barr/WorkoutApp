import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek } from 'date-fns'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function DurationGraph(props) {
    const [graphData, setGraphData] = useState(null)
    const [options, setOptions] = useState(null)
    
    const todayDate = new Date()
    const DOTW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const todayIndex = todayDate.getDay()
    const start = startOfWeek(todayDate).toLocaleDateString('fr-CA')
    const end = endOfWeek(todayDate).toLocaleDateString('fr-CA')
    const userTimeZone = new Date().toLocaleTimeString([], { timeZoneName: 'short' }).split(' ')[2];

    useEffect(() => {
        const getdurations = async () => {
            const postData = {
                startDate: start,
                endDate: end
            }
            try{
                const response = await fetch('/api/get/durations', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                });
                console.log('after duratons post')
                console.log(response)
            
                if (!response.ok) {
                    console.error(`Error: ${response.statusText}`);
                }
                
                const responseData = await response.json()
                const rows = responseData.rows

                let rowIndex = 0
                let durations = []
                
                const days = rows.map(row => DOTW[new Date(row.date+userTimeZone).getDay()])
                for (let i = 0; i <= todayIndex; i++) {
                    if (days.includes(DOTW[i])) {
                        let duration = parseFloat(rows[rowIndex].duration)
                        durations.push(duration)
                        rowIndex++
                    }
                    else {
                        durations.push(0)
                    }
                }
                
                const yStep = 30
                const graphMin = 0;
                const graphMax = Math.ceil((Math.max(...durations) + 1) / yStep) * yStep;
            
                setGraphData({
                labels: DOTW,
                datasets: [
                    {
                        label: 'Duration (min)',
                        data: durations,
                        borderColor: 'rgb(0, 0, 0)',
                        backgroundColor: 'rgba(0, 0, 0, 1)'
                    },
                ],
                });
                setOptions({
                    scales: {
                        y: {
                            min: graphMin,
                            max: graphMax,
                            ticks: {
                                stepSize: yStep,
                            }
                        }
                    },
                responsive: true,
                maintainAspectRatio: false
                });
            }
            catch (err) {
                console.log(err)
            }
        }

        getdurations()

    }, [props.durationInput]);
    
    return graphData && options ? (
        <Bar options={options} data={graphData} />
      ) : (
        <div className="form-container">
            <div className="p-4">
            Loading
            </div>
        </div>
      )
  }