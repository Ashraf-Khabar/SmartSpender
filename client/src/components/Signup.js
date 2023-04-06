import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ darkModeValue }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const Register = async (e) => {
        setIsPending(true);
        e.preventDefault();
        if (email !== '' && name !== '' && password !== '' && confPassword !== '') {
            try {
                await axios.post('http://localhost:5000/users', {
                    name: name,
                    email: email,
                    password: password,
                    confPassword: confPassword
                });
                history.push("/login");
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }

        } else {
            setMsg('Empty fields');
        }
        setIsPending(false);

    }

    return (
        <div data-theme={darkModeValue} className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                    {msg &&
                        (
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{msg}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <form onSubmit={Register} className=" shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 input leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 input leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 input leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="confPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow border rounded w-full py-2 px-3 input leading-tight focus:outline-none focus:shadow-outline"
                            id="confPassword"
                            type="password"
                            placeholder="******"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Signup