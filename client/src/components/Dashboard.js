import React from 'react'
import Divisions from './dashboard/Divisions'
import Expenses from './dashboard/Expenses';


const Dashboard = ({ darkModeValue }) => {
    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            {<Divisions darkModeValue={darkModeValue} />}
            <br/><br/>
            {<Expenses darkModeValue={darkModeValue} />}
        </div>
    );
}

export default Dashboard