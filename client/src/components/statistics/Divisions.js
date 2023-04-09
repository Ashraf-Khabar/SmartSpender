import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const DivisionsStat = ({ darkModeValue }) => {
    const [isPending, setIsPending] = useState(false);

    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                label: [],
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    });

    const [barData, setbarData] = useState({
        labels: [],
        datasets: [
            {
                label: [],
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    });

    const [divisions, setDivisions] = useState([]);
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllDivisionsForPie();
    }, [userId, divisions]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/login");
            }
        }
    }
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {return Promise.reject(error);});

    const getAllDivisionsForPie = () => {
        try {

            const result = axiosJWT.get(`http://localhost:5000/${userId}/divisions`);
            result.then((response) => {
                setIsPending(true);
                const divisions = response.data.divisions;
                const labels = divisions.map((division) => division.category);
                const data = divisions.map((division) => division.budget);
                const backgroundColor = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ];
                const borderColor = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ];
                setPieData({
                    labels,
                    datasets: [
                        {
                            label: 'Budget',
                            data,
                            backgroundColor,
                            borderColor,
                            borderWidth: 1,
                        }
                    ]
                });
                setIsPending(false);
                setDivisions(divisions);
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <center>
                <div className="bg-gray-50 dark:bg-black p-10 items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
                        <p className="text-black dark:text-white block text-xl leading-snug mt-3">
                            This Pie chart show how much you spend on your needs :
                        </p>
                        <div className="">
                            {isPending &&
                                <center role="status">
                                    <svg aria-hidden="true"
                                         className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </center>
                            }
                            <Pie data={pieData} />
                        </div>
                        <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                        <div className="text-gray-500 dark:text-gray-400 flex mt-3">
                            <div className="flex items-center mr-6">
                                {name}
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}

export default DivisionsStat;

