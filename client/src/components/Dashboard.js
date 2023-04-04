import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";

const Dashboard = ({ darkModeValue }) => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const [divisons, setDivisions] = useState([]);
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState();

    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllDivisions();
    }, [userId, divisons]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setUserId(decoded.userId);
            console.log(decoded.userId);
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

    function showAlertForDivision(title, text, icon) {
        swal({
            title: title,
            text: text,
            icon: icon,
            buttons: true,
            dangerMode: true,
        })
    }

    const getAllDivisions = () => {
        try {
            // make an Axios request to fetch the divisions
            const result = axiosJWT.get(`http://localhost:5000/${userId}/divisions`);
            // update the state variable once the response is received
            result.then((response) => {
                console.log(response.data.divisions[0]);
                setDivisions(response.data.divisions);
            });
            // Note: You should not access `divisons` immediately after `setDivisions`, as it's an asynchronous operation.
            // You need to return the Axios promise from this function
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const result = axiosJWT.post(`http://localhost:5000/${userId}/divisions`, {
                category: category,
                budget: budget
            });
            console.log('added successfully');
            showAlertForDivision("Added successfully", "You added a new division", "success");
        } catch (error) {
            console.log(error);
        }
    }


    const handleModify = () => {

    }

    const handleDelete = async (id) => {
        try {
            const result = await axiosJWT.delete(`http://localhost:5000/${userId}/divisions/${id}`);
            console.log(result);
            // Remove the deleted division from the state
            setDivisions(divisons.filter((division) => division._id !== id));
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <div className="overflow-x-auto">
                <center>
                    <p className='text-3xl text-center font-bold'>Divisions :</p><br />
                </center>
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>category</th>
                            <th>budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            divisons.map((division, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{division.category}</td>
                                    <td>{division.budget} DH</td>
                                    <td>
                                        <button className='btn btn-outline btn-success' onClick={() => handleDelete(division._id)}>Delete</button>
                                        <button className='btn btn-outline btn-success' onClick={() => handleModify(division)}>Modify</button>
                                    </td>
                                </tr>
                            ))

                        }
                        <tr>
                            <td>{divisons.length + 1}</td>
                            <td><input name='category' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setCategory(e.target.value)} /></td>
                            <td><input name='budget' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setBudget(e.target.value)} /></td>
                            <td><button className='btn btn-outline btn-success' onClick={handleAdd}>Add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Dashboard