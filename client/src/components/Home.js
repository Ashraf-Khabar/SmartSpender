import React from 'react'

const Home = ({ darkModeValue }) => {

    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20" style={{height: "93vh"}}>

            <h1>
                home 
            </h1>
        </div>
    )
}

export default Home;