import { Component } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { startOfWeek, endOfWeek, format } from 'date-fns'

export default function DurationGraph() {
    // get durations from weight history
    let durations = [90, 0, 90, 60]

    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
        {
            id: 1,
            label: 'Time Spent (min)',
            data: durations,
        },
        ],
    };
    const options = {
        scales: {
        yAxis: {
            min: Math.max(Math.min(...durations) - 30, 0),
            max: Math.max(...durations) + 30,
        }
        },
        responsive: true,
        maintainAspectRatio: false
    }
    return <Line options={options} data={data} />
}