import Avatar from '../../img/avatar.PNG';

const MyAccount = ({ darkModeValue }) => {

    return (
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <center>
                <div className=" lg:text-left">
                    <h1 className="text-5xl text-center font-bold">My account</h1>
                </div>
                <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                    <form onSubmit={() => { }} >
                        <div class="flex -mx-3" >
                            <div class="w-full px-3 mb-5">
                                <div htmlFor="image-upload" className="w-24 rounded">
                                    <img src={Avatar} /><br/>
                                </div>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input
                                        type="file"
                                        class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none"
                                        label="Profil Image"
                                        name="Image"
                                        id="image-upload"
                                        accept=".jpeg, .png, .jpg"
                                        placeholder="Upload profil image"
                                    >

                                    </input>
                                </div>
                            </div>
                        </div>
                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-5">
                                <label for="" class="text-xs font-semibold px-1">Name</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="johnsmith@example.com"></input>
                                </div>
                            </div>
                        </div>
                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-5">
                                <label for="" class="text-xs font-semibold px-1">Email</label>
                                <div class="flex">
                                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none" placeholder="johnsmith@example.com"></input>
                                </div>
                            </div>
                        </div>

                        <div class="flex -mx-3">
                            <div class="w-full px-3 mb-5">
                                <button data-theme={darkModeValue} class="btn btn-outline btn-success block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold">SAVE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </center>
        </div>

    )
}


export default MyAccount; 