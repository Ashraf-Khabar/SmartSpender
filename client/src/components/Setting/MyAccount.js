import Avatar from '../../img/avatar.PNG';
import { useState, useEffect } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const MyAccount = ({ darkModeValue }) => {
    const [postImage, setPostImage] = useState({ image: "" });
    const [userImage, setUserImage] = useState();
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [isPending, setIsPending] = useState(false);
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
        setIsPending(true);
        try {
            await axios.post(`http://localhost:5000/upload/${userEmail}`, { image: image.image });
            showAlertUploaded();
        } catch (error) {
            showAlertUploadedFailed(error);
        }
        setIsPending(false);
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
        setPostImage({ ...postImage, image: base64 });
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
                <div className=" lg:text-left">
                    <h1 className="text-5xl text-center font-bold">My account</h1>
                </div>
                <div className="w-full md:w-1/2 py-10 px-5 md:px-10">

                    <form onSubmit={handleSubmit} >
                        <div className="flex -mx-11" >
                            <div className="w-full px-3 mb-5">
                                <div htmlFor="image-upload" className="w-24 rounded">
                                    <img src={userImage || Avatar} /><br />
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

