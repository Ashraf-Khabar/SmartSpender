import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios, { Axios } from 'axios';
import jwt_decode from "jwt-decode";
import { Link, useHistory } from 'react-router-dom';
import swal from "sweetalert";
import swal2 from "sweetalert2";

ChartJS.register(ArcElement, Tooltip, Legend);





const Divisions = ({ darkModeValue }) => {
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
    const [divisions, setDivisions] = useState([]);
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState();

    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllDivisions();
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
    }, (error) => {
        return Promise.reject(error);
    });


    const getAllDivisions = () => {
        try {
            const result = axiosJWT.get(`http://localhost:5000/${userId}/divisions`);
            result.then((response) => {
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
                setDivisions(divisions);
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            {/* component */}
            <div className="p-24 max-h-full flex flex-wrap">
                <Pie data={pieData} />
            </div>
        </>


    )
}

export default Divisions;

