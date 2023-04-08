import React from 'react'
import Expenses from './seeMore/Expenses';
import DivisionsDash from './dashboard/DivisionsDash';
import ExpensesDash from "./dashboard/ExpensesDash";


const Dashboard = ({ darkModeValue }) => {
    return (
        <div data-theme={darkModeValue} className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            {<DivisionsDash darkModeValue={darkModeValue} />}
            <br/><br/>
            {<ExpensesDash darkModeValue={darkModeValue} />}
        </div>
    );
}

export default Dashboard