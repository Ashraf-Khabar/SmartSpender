import React from 'react'

const Home = ({ darkModeValue }) => {

    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <section className="relative  bg-blueGray-50">
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                'url("https://credit.org/wp-content/uploads/2015/09/10-rules-of-financial-management_op1.jpg")'
                        }}
                    >
                    </div>
                    <div className="container relative mx-auto">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <div className="pr-12">
                                    <h1 className="font-semibold text-5xl">
                                        SMART SPENDER
                                    </h1>
                                    <p className="mt-4 text-lg text-blueGray-200">
                                        Welcome to our innovative money management app, designed to help you take control of your finances and achieve your financial goals. With our easy-to-use interface and powerful features, you can track your expenses, create budgets, and analyze your spending patterns to make informed financial decisions.

                                        Our app is perfect for anyone who wants to get a better handle on their finances, whether you're a busy professional, a student on a tight budget, or simply looking to save for a big purchase. Our goal is to provide you with the tools you need to build a strong financial foundation, so you can live the life you want without worrying about money.

                                        So why wait? Sign up for our app today and start taking control of your finances!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                        style={{ transform: "translateZ(0px)" }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x={0}
                            y={0}
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            />
                        </svg>
                    </div>
                </div>
                <section className="pb-10 bg-blueGray-200 -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className=" p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                            <i className="fas fa-award" />
                                        </div>
                                        <h6 className="text-xl text-green-700 font-semibold">Blogs</h6>
                                        <p className="mt-2 mb-4 text-green-700 text-blueGray-500">
                                            Blogs about money mindset and money mangement
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-slate-400">
                                            <i className="fas fa-retweet" />
                                        </div>
                                        <h6 className="text-xl text-green-700 font-semibold">Free Revisions</h6>
                                        <p className="mt-2 mb-4 text-green-700 text-blueGray-500">
                                            Keep you user engaged by providing meaningful information.
                                            Remember that by this time, the user is curious.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                    <div className="px-4 py-5 flex-auto">
                                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                                            <i className="fas fa-fingerprint" />
                                        </div>
                                        <h6 className="text-xl text-green-700 font-semibold">Verified Company</h6>
                                        <p className="mt-2 mb-4 text-green-700 text-blueGray-500">
                                            Write a few lines about each one. A paragraph describing a
                                            feature will be enough. Keep you user engaged!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

        </div>
    )
}

export default Home;