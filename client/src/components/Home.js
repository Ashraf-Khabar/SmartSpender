import React from 'react'

const Home = ({ darkModeValue }) => {

    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20" style={{ height: "93vh" }}>

            <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                    <div className="artboard artboard-demo phone-1">Hi.</div>
                </div>
            </div>
        </div>
    )
}

export default Home;