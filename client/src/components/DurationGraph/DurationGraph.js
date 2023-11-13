import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function DurationGraph() {

    // get durations from weight history
    let durations = [90, 0, 90, 60];
    const graphMin = Math.max(Math.floor((Math.min(...durations) - 1) / 20) * 20, 0);
    const graphMax = Math.ceil((Math.max(...durations) + 1) / 20) * 20;

    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
        {
            label: 'Time Spent (min)',
            data: durations,
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
            ticks : {
                stepSize: 20,
            }
        }
        },
        responsive: true,
        maintainAspectRatio: false
    }
    return <Line options={options} data={data} />
}