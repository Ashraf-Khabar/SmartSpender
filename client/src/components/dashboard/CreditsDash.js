import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import {useEffect, useState} from "react";

const CreditsDash = () => {

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [userId, setUserId] = useState();
    const [credits, setCredits] = useState([]);
    const [creditName, setCreditName] = useState('');
    const [amount, setAmount] = useState();

    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getAllCredits();
    }, [userId, credits]);

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

    function showAlertForCredits(title, text, icon) {
        const promise = swal({
            title: title,
            text: text,
            icon: icon,
            buttons: true,
            dangerMode: true,
        });
        return promise;
    };

    const getAllCredits = () => {
        try {
            const result = axiosJWT.get(`http://localhost:5000/${userId}/credits`);
            result.then((response) => {
                setCredits(response.data.credits);
            });
            return result;
        } catch (error) {
            console.log(error);
            showAlertForCredits("Error", error, "error");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (creditName === '' || amount === '') {
            showAlertForCredits("Emplty fields", "You should put something on the fields", "error");
        } else {
            try {

                const result = axiosJWT.post(`http://localhost:5000/${userId}/credits`, {
                    creditName: creditName,
                    amount: amount
                });
                showAlertForCredits("Added successfully", "You added a new credit", "success");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleModify = (id, creditNameValue, amountValue) => {
        swal2.fire({
            title: 'Modify',
            html: `
                <div class="max-w-md mx-auto bg-gray-800 text-gray-800 p-6 rounded-lg">
                    <form>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="creditName">
                                name
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="creditName" type="text" placeholder="name" value="${creditNameValue}">
                        </div>
                        <div class="mb-4">
                            <label class="block font-bold mb-2" for="amount">
                                amount
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-gray-700 focus:outline-none focus:shadow-outline" id="amount" type="number" placeholder="Budget" value="${amountValue}">
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
                const creditName = document.querySelector('#creditName').value;
                const amount = document.querySelector('#amount').value;
                try {
                    const result = axiosJWT.put(`http://localhost:5000/${userId}/credits/${id}`, {
                        creditName: creditName,
                        amount: amount
                    });
                    showAlertForCredits("Added successfully", "You added a new credit", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    const handleDelete = async (id) => {
        showAlertForCredits("Delete credit", "Are you sure you want to delete this credit", "warning").then((willDelete) => {
            if (willDelete) {
                swal("Delete successfully", "Delete", "success");
                try {
                    axiosJWT.delete(`http://localhost:5000/${userId}/credits/${id}`);
                    setCredits(credits.filter((credit) => credit._id !== id));
                } catch (error) {
                    console.log(error);
                }
            }
        });

    };

    return (
        <div className="overflow-x-auto">
            <center>
                <p className='text-3xl text-center font-bold'>Credits :</p><br />
            </center>

            <table className="table table-zebra w-full">
                <thead>
                <tr>
                    <th></th>
                    <th>name</th>
                    <th>amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    credits.map((credit, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{credit.creditName}</td>
                            <td>{credit.amount} DH</td>
                            <td>
                                <button className='btn btn-outline btn-success' onClick={() => handleDelete(credit._id)}>Delete</button>
                                <button className='btn btn-outline btn-success' onClick={() => handleModify(credit._id, credit.creditName, credit.amount)}>Modify</button>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td>{credits.length + 1}</td>
                    <td><input name='creditNameValue' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setCreditName(e.target.value)} /></td>
                    <td><input name='amount' className='input input-bordered input-success w-full max-w-xs' type="text" onChange={(e) => setAmount(e.target.value)} /></td>
                    <td><button className='btn btn-outline btn-success' onClick={handleAdd}>Add</button></td>
                </tr>
                </tbody>
                <br />
            </table>
        </div>
    );
}

export default CreditsDash ;