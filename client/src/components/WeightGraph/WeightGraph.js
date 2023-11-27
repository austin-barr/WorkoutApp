import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { startOfWeek, endOfWeek } from 'date-fns'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function WeightGraph(props) {
    const [graphData, setGraphData] = useState(null)
    const [options, setOptions] = useState(null)
    const [noWeights, setNoWeights] = useState(false)
    
    const todayDate = new Date()
    const DOTW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const todayIndex = todayDate.getDay()
    const start = startOfWeek(todayDate).toLocaleDateString('fr-CA')
    const end = endOfWeek(todayDate).toLocaleDateString('fr-CA')
    const userTimeZone = new Date().toLocaleTimeString([], { timeZoneName: 'short' }).split(' ')[2];

    useEffect(() => {
        const getWeights = async () => {
            const postData = {
                startDate: start,
                endDate: end
            }
            try{
                const response = await fetch('/api/get/weights', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData),
                });
            
                if (!response.ok) {
                    console.error(`Error: ${response.statusText}`);
                }
                
                const responseData = await response.json()
                const rows = responseData.rows
                if (responseData.prevWeight[0] === undefined) {
                    setNoWeights(true);
                    return
                }
                const prevWeight = parseFloat(responseData.prevWeight[0].weight)

                let lastWeight = prevWeight
                let rowIndex = 0
                let weights = []
                
                const days = rows.map(row => DOTW[new Date(row.date+userTimeZone).getDay()])
                for (let i = 0; i <= todayIndex; i++) {
                    if (days.includes(DOTW[i])) {
                        let weight = parseFloat(rows[rowIndex].weight)
                        weights.push(weight)
                        rowIndex++
                        lastWeight = weight
                    }
                    else {
                        weights.push(lastWeight)
                    }
                }
            
                const yStep = 5
                const graphMin = Math.floor((Math.min(...weights) - 1) / yStep) * yStep;
                const graphMax = Math.ceil((Math.max(...weights) + 1) / yStep) * yStep;
            
                setGraphData({
                labels: DOTW,
                datasets: [
                    {
                        label: 'Weight (lbs)',
                        data: weights,
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
                console.error(err)
            }
        }

        getWeights()

    }, [props.weightInput]);
    
    return graphData && options ? (
        <Line options={options} data={graphData} />
      ) : ( noWeights ? (
        <form className="form-container">
            <div className="p-4">
            No weight data available
            </div>
        </form>
      ) : (
        <form className="form-container">
            <div className="p-4">
            Loading
            </div>
        </form>
      )
      )
  }