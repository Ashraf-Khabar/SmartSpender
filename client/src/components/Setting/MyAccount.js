import Avatar from '../../img/avatar.PNG';
import { useState } from "react";
import axios from 'axios';

const MyAccount = ({ darkModeValue }) => {

    const [postImage, setPostImage] = useState({ image: "" });

    const createPost = async (image) => {
        try {
            await axios.post('http://localhost:5000/upload', image);
        } catch (error) {
            console.log(error);
        }
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
        setPostImage({ ...postImage, image: base64.data });
        console.log(`Result : ${base64}`);
    }


    return (
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <center>
                <div className=" lg:text-left">
                    <h1 className="text-5xl text-center font-bold">My account</h1>
                </div>
                <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                    <form onSubmit={handleSubmit} >
                        <div className="flex -mx-3" >
                            <div className="w-full px-3 mb-5">
                                <div htmlFor="image-upload" className="w-24 rounded">
                                    <img src={postImage.image && Avatar} /><br />
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
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label className="text-xs font-semibold px-1">Name</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="johnsmith@example.com"></input>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label className="text-xs font-semibold px-1">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="johnsmith@example.com"></input>
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

