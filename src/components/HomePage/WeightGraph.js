import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { startOfWeek, endOfWeek, format } from 'date-fns'

export default function WeightGraph() {
    let today = new Date()
    let start = startOfWeek(today)
    let end = endOfWeek(today)
    // get weights from weight history
    // get to api/graph
    let weights = [150, 150, 151, 152]

    let data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
        {
        id: 1,
        label: 'Weight (lbs)',
        data: weights,
        },
    ],
    };
    let options = {
    scales: {
        yAxis: {
        min: Math.min(...weights) - 5,
        max: Math.max(...weights) + 5,
        }
    },
    responsive: true,
    maintainAspectRatio: false
    }
    return <Line options={options} data={data} />
  }