import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { getAttendanceGraphDataApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, LineElement, ArcElement, PointElement, Filler);

const BarChart = ({ graphKey }) => {

    const role = localStorage.getItem('loggedInUserRole');
    const navigate = useNavigate();
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Go Attendance',
                data: [],
                backgroundColor: '#A7C883',
                borderRadius: 5,
            }
        ]
    });

    const options = {
        responsive: true,
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                },
                border: {
                    color: '#008479',
                },
            },
            y: {
                grid: {
                    display: true,
                    color: '#F3F9F8',
                },
                ticks: {
                    color: '#000',
                },
                beginAtZero: true,
                max: 200,
                border: {
                    color: '#008479',
                },
            },
        }
    };

    useEffect(() => {
        if (role === 'ADMIN' || graphKey) {
            attendanceGraphData();
        }
    }, [graphKey]);

    const attendanceGraphData = async () => {
        try {
            var response = await getAttendanceGraphDataApi(graphKey);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    const { xAxis, yAxis } = response?.data?.attendanceGraph
                    setData({
                        labels: xAxis.map(x => `${x}`),
                        datasets: [
                            {
                                label: 'Go Attendance',
                                data: yAxis,
                                backgroundColor: '#A7C883',
                                borderRadius: 5,
                            }
                        ]
                    });
                }
            }
            else {
                // toast.error(response.data.message);
            }
        }
        catch (error) {
            console.error(error);
            if (error?.response?.data?.statusCode === 401) {
                toast.error("Unauthorized. Redirecting...");
                setTimeout(() => {
                    navigate('/'); // Redirect on error
                }, 2000);
            } else {
                toast.error("Something went wrong!");
            }
        }

    };


    return (

        <>
            <div className="chart-container" style={{ height: '18em' }}>
                <Bar data={data} options={options}></Bar>
            </div>
        </>
    );
}

export default BarChart;









// const data = {
//     labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven'],
//     datasets: [
//         {
//             label: 'Go Attendance',
//             data: [20, 50, 35, 75, 65, 120, 200, 100, 60, 180, 85],
//             backgroundColor: '#A7C883',
//             borderRadius: 5,
//         }
//     ]
// };

// const options = {
//     responsive: true,
//     layout: {
//         padding: {
//             top: 10,
//             bottom: 10,
//             left: 10,
//             right: 10,
//         },
//     },
//     plugins: {
//         legend: {
//             display: false,
//         }
//     },
//     scales: {

//         x: {
//             grid: {
//                 display: true,
//                 color: '#F3F9F8',
//             },
//             ticks: {
//                 color: '#000',
//             },
//             border: {
//                 color: '#008479',
//             },
//         },
//         y: {
//             grid: {
//                 display: true,
//                 color: '#F3F9F8',

//             },
//             ticks: {
//                 color: '#000',
//             },
//             beginAtZero: true,
//             max: 200,
//             border: {
//                 color: '#008479',
//             },
//         },
//     }
// };
