import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Link, useHistory } from 'react-router-dom';
import swal from "sweetalert";
import swal2 from "sweetalert2";



const Dashboard = ({ darkModeValue }) => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const [divisons, setDivisions] = useState([]);
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState();

    const [showAllDivisions, setShowAllDivisions] = useState(false); // new state variable

    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllDivisions();
    }, [userId, divisons, showAllDivisions]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
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

    function showAlertForDivision(title, text, icon) {
        const promise = swal({
            title: title,
            text: text,
            icon: icon,
            buttons: true,
            dangerMode: true,
        });
        return promise;
    };

    const getAllDivisions = () => {
        try {
            const result = axiosJWT.get(`http://localhost:5000/${userId}/divisions`);
            result.then((response) => {
                if (response.data.divisions.length > 5) {
                    const firstFiveDivisions = response.data.divisions.slice(0, 5);
                    setDivisions(firstFiveDivisions);
                    setShowAllDivisions(true);
                    console.log(showAllDivisions);
                } else {
                    setShowAllDivisions(false);
                    setDivisions(response.data.divisions);
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            showAlertForDivision("Error", error, "error");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (category === '' || budget === '') {
            showAlertForDivision("Emplty fields", "You should put something on the fields", "error");
        } else {
            try {

                const result = axiosJWT.post(`http://localhost:5000/${userId}/divisions`, {
                    category: category,
                    budget: budget
                });
                showAlertForDivision("Added successfully", "You added a new division", "success");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleModify = (id, categoryValue, budgetValue) => {
        swal2.fire({
            title: 'Modify',
            html: `
                <div class="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg">
                    <form>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="category">
                                Category
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="category" type="text" placeholder="Category" value="${categoryValue}">
                        </div>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="budget">
                                Budget
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="budget" type="number" placeholder="Budget" value="${budgetValue}">
                        </div>
                    </form>
                </div>
            `,
            confirmButtonColor: '#34D399',
            confirmButtonText: 'Save',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                // handle form submission
                const category = document.querySelector('#category').value;
                const budget = document.querySelector('#budget').value;
                try {
                    const result = axiosJWT.put(`http://localhost:5000/${userId}/divisions/${id}`, {
                        category: category,
                        budget: budget
                    });
                    showAlertForDivision("Added successfully", "You added a new division", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleDelete = async (id) => {
        showAlertForDivision("Delete division", "Are you sure you want to delete this division", "warning").then((willDelete) => {
            if (willDelete) {
                swal("Delete successfully", "Delete", "success");
                try {
                    axiosJWT.delete(`http://localhost:5000/${userId}/divisions/${id}`);
                    setDivisions(divisons.filter((division) => division._id !== id));
                } catch (error) {
                    console.log(error);
                }
            }
        });

    };

    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <div className="overflow-x-auto">
                <center>
                    <p className='text-3xl text-center font-bold'>Divisions :</p><br />
                </center>
                <Link className='btn btn-outline btn-success' to='/dashboard/divisionsStat'>Statistics</Link><br /><br />
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
                                        <button className='btn btn-outline btn-success' onClick={() => handleModify(division._id, division.category, division.budget)}>Modify</button>
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
                    <br />
                </table>
                {
                    showAllDivisions && (
                        <Link className='btn btn-outline btn-success' >See more</Link>
                    )
                }
            </div>
            <div className="overflow-x-auto">
                <center>
                    <p className='text-3xl text-center font-bold'>Divisions :</p><br />
                </center>
                <Link className='btn btn-outline btn-success' to='/dashboard/divisionsStat'>Statistics</Link><br /><br />
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
                                        <button className='btn btn-outline btn-success' onClick={() => handleModify(division._id, division.category, division.budget)}>Modify</button>
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
                    <br />
                </table>
                {
                    showAllDivisions && (
                        <Link className='btn btn-outline btn-success' >See more</Link>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard