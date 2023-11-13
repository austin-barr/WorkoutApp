import { Line } from "react-chartjs-2";
import { startOfWeek, endOfWeek } from 'date-fns'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function WeightGraph() {
    let today = new Date()
    let start = startOfWeek(today)
    let end = endOfWeek(today)
    // get weights from weight history
    // get to api/graph
    let weights = [150, 150, 151, 152]
    const graphMin = Math.floor((Math.min(...weights) - 1) / 2) * 2;
    const graphMax = Math.ceil((Math.max(...weights) + 1) / 2) * 2;

    const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
        {
            label: 'Weight (lbs)',
            data: weights,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 1)'
        },
    ],
    };
    const options = {
        scales: {
            y: {
                min: graphMin,
                max: graphMax,
                ticks: {
                    stepSize: 2,
                }
            }
        },
    responsive: true,
    maintainAspectRatio: false
    }
    return <Line options={options} data={data} />
  }