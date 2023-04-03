import Avatar from '../../img/avatar.PNG';
import { useState, useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import swal from "sweetalert";

const MyAccount = ({ darkModeValue }) => {
    const [postImage, setPostImage] = useState({ image: "" });
    const [userImage, setUserImage] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useHistory();

    useEffect(() => {
        refreshToken();
    }, [userEmail, userName]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserEmail(decoded.email);
            setUserName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }



    const createPost = async (image) => {
        try {
            await axios.post(`http://localhost:5000/upload/${userEmail}`, {image: image.image});
            showAlertUploaded();
        } catch (error) {
            showAlertUploadedFailed(error);
        }
    }

    function showAlertUploaded() {
        swal({
            title: "Uploaded Successfully",
            text: "You Uploaded The Profile Picture",
            icon: "success",
            buttons: true,
            dangerMode: true,
        })
    }

    function showAlertUploadedFailed(error) {
        swal({
            title: "Uploaded Failed",
            text: error,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost(postImage);
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({...postImage, image: base64});
    }

    useEffect(() => {
        const getUserImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getImage/${userEmail}`);
                setUserImage(response.data);
            } catch (error) {
                showAlertUploadedFailed(error)
            }
        };
        getUserImage();
    }, [userEmail]);

    return (
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <center>
                <div className=" lg:text-left">
                    <h1 className="text-5xl text-center font-bold">My account</h1>
                </div>
                <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                    <form onSubmit={handleSubmit} >
                        <div className="flex -mx-11" >
                            <div className="w-full px-3 mb-5">
                                <div htmlFor="image-upload" className="w-24 rounded">
                                    <img src={ userImage || Avatar} /><br />
                                </div>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input
                                        type="file"
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none"
                                        label="Profil Image"
                                        name="Image"
                                        id="image-upload"
                                        accept=".jpeg, .png, .jpg"
                                        placeholder="Upload profil image"
                                        onChange={(e) => handleFileUpload(e)}
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-11">
                            <div className="w-full px-3 mb-5">
                                <label className="text-xs font-semibold px-1">Name</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder={userName}></input>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-11">
                            <div className="w-full px-3 mb-5">
                                <label className="text-xs font-semibold px-1">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder={userEmail}></input>
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <button data-theme={darkModeValue} className="btn btn-outline btn-success block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold">SAVE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </center>
        </div>

    )
}

export default MyAccount;

