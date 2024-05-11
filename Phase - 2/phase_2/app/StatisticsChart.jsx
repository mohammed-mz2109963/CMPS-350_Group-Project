import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function StatisticsChart({ datasets, chartLabels }) {
    const chartData = {
        labels: chartLabels,
        datasets: datasets.map((dataset, index) => ({
            label: dataset.label,
            data: dataset.values,
            backgroundColor: `rgba(${index * 50}, 132, ${index * 100}, 0.2)`, // Adjust color dynamically
            borderColor: `rgba(${index * 50}, 132, ${index * 100}, 1)`, // Adjust border color dynamically
            borderWidth: 1
        }))
    };

    const chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <div>
            <h2>Statistics Chart</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default StatisticsChart;