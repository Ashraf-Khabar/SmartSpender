import './Setting.css';
import MyAccount from './MyAccount';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Avatar from '../../img/avatar.PNG';
import {useHistory} from "react-router-dom";


const Setting = ({ darkModeValue }) => {
    const [myAccount, setMyAccount] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState("");
    const [userImage, setUserImage] = useState();
    const history = useHistory();


    const handleClickMyProfile = (className) => {
        setMyAccount(true);
    }

    function toggleSidebar() {
        var sidebar = document.querySelector('.sidebar');
        sidebar.classNameList.toggle('sidebar-hidden');
    }

    useEffect(() => {
        const getUserImage = async () => {
            try {
                console.log(userEmail);
                const response = await axios.get(`http://localhost:5000/getImage/${userEmail}`);
                console.log(response.data);
                setUserImage(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserImage();
    }, [userEmail]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwt_decode(response.data.accessToken);
            setUserEmail(decoded.email);
            setUserName(decoded.name);

        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    useEffect(() => {
        refreshToken();
    }, [userEmail, userImage, userName]);

    return (
        <div className="container">
            <div className="sidebar">
                <div data-theme={darkModeValue} className="relative">
                    <div className="flex flex-col sm:flex-row sm:justify-around">
                        <div className="h-screen w-72">
                            <div className="flex items-center justify-start mx-6 mt-10">
                                <div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={userImage || Avatar} />
                                    </div>
                                </div>
                                &emsp;&emsp;<div className="badge badge-primary">{userName}</div>
                            </div>
                            <nav className="mt-10 px-6 ">
                                <button onClick={handleClickMyProfile} className="py-2 px-4 flex justify-center items-center  btn-outline btn-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                                        </path>
                                    </svg>
                                    <span className="mx-4 text-lg font-normal">
                                        My account
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                                </button>
                                <br />
                                <button className="py-2 px-4 flex justify-center items-center btn-outline btn-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z">
                                        </path>
                                    </svg>
                                    <span className="mx-4 text-lg font-normal">
                                        Privacy - security
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                                </button>
                                <br />
                                <button className="py-2 px-4 flex justify-center items-center btn-outline btn-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z">
                                        </path>
                                    </svg>
                                    <span className="mx-4 text-lg font-normal">
                                        Notifications
                                    </span>
                                    <span className="flex-grow text-right">

                                    </span>
                                </button>
                                <br />
                                <button className="py-2 px-4 flex justify-center items-center btn-outline btn-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                                    <svg width="20" height="20" className="m-auto" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                        </path>
                                    </svg>
                                    <span className="mx-4 text-lg font-normal">
                                        Language - region
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content">
                {<MyAccount darkModeValue={darkModeValue} />}
            </div>

        </div>
    )
}

export default Setting;