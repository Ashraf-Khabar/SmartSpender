import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Link, useHistory } from 'react-router-dom';
import swal from "sweetalert";
import swal2 from "sweetalert2";

const Expenses = ({ darkModeValue }) => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState();

    const [showAllExpenses, setShowAllExpenses] = useState(false); // new state variable

    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllExpenses();
    }, [userId, expenses, showAllExpenses]);

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

    function showAlertForExpenses(title, text, icon) {
        const promise = swal({
            title: title,
            text: text,
            icon: icon,
            buttons: true,
            dangerMode: true,
        });
        return promise;
    };

    const getAllExpenses = () => {
        try {
            const result = axiosJWT.get(`http://localhost:5000/${userId}/expenses`);
            result.then((response) => {
                setExpenses(response.data.expenses);
            });
            return result;
        } catch (error) {
            console.log(error);
            showAlertForExpenses("Error", error, "error");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (description === '' || amount === '') {
            showAlertForExpenses("Emplty fields", "You should put something on the fields", "error");
        } else {
            try {

                const result = axiosJWT.post(`http://localhost:5000/${userId}/expenses`, {
                    description: description,
                    amount: amount
                });
                showAlertForExpenses("Added successfully", "You added a new expenses", "success");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleModify = (id, descriptionValue, amountValue) => {
        swal2.fire({
            title: 'Modify',
            html: `
                <div class="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-lg">
                    <form>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="category">
                                Category
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="category" type="text" placeholder="Category" value="${descriptionValue}">
                        </div>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="budget">
                                Budget
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="budget" type="number" placeholder="Budget" value="${amountValue}">
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
                const description = document.querySelector('#description').value;
                const amount = document.querySelector('#amount').value;
                try {
                    const result = axiosJWT.put(`http://localhost:5000/${userId}/expenses/${id}`, {
                        description: description,
                        amount: amount
                    });
                    showAlertForExpenses("Added successfully", "You added a new expenses", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleDelete = async (id) => {
        showAlertForExpenses("Delete division", "Are you sure you want to delete this division", "warning").then((willDelete) => {
            if (willDelete) {
                swal("Delete successfully", "Delete", "success");
                try {
                    axiosJWT.delete(`http://localhost:5000/${userId}/expenses/${id}`);
                    setExpenses(expenses.filter((expense) => expense._id !== id));
                } catch (error) {
                    console.log(error);
                }
            }
        });

    };
    return (
        <div className="overflow-x-auto">
            <center>
                <p className='text-3xl text-center font-bold'>Expenses :</p><br />
            </center>
            <Link className='btn btn-outline btn-success' to='/dashboard/divisionsStat'>Statistics</Link><br /><br />
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>description</th>
                        <th>amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount} DH</td>
                                <td>
                                    <button className='btn btn-outline btn-success' onClick={() => handleDelete(expense._id)}>Delete</button>
                                    <button className='btn btn-outline btn-success' onClick={() => handleModify(expense._id, expense.description, expense.amount)}>Modify</button>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td>{expenses.length + 1}</td>
                        <td><input name='category' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setDescription(e.target.value)} /></td>
                        <td><input name='budget' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setAmount(e.target.value)} /></td>
                        <td><button className='btn btn-outline btn-success' onClick={handleAdd}>Add</button></td>
                    </tr>
                </tbody>
                <br />
            </table>
            {
                showAllExpenses && (
                    <Link to='/dashboard/divisions' className='btn btn-outline btn-success' >See more</Link>
                )
            }
        </div>
    );
}

export default Expenses;

