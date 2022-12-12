import React from "react";
import Datepicker from "react-tailwindcss-datepicker"; 

export const DateFilter = ({ dateRange, setdateRange}) => { 

    const handleValueChange = (newValue) => {console.log("newValue:", newValue); 
    setdateRange(newValue); 
    } 

    return (
    <div>
        <Datepicker 
            primaryColor={"blue"}
            value={dateRange} 
            onChange={handleValueChange}
            showShortcuts={true}
        /> 
    </div>
    );
}; 