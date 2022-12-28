import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

export const DateFilter = ({ dateRange, setdateRange }) => {
  const handleValueChange = (newValue) => {
    setdateRange(newValue);
  };

  return (
    <Datepicker
      primaryColor={'indigo'}
      value={dateRange}
      onChange={handleValueChange}
      showShortcuts={true}
      placeholder={'Date filter'}
      inputClassName="text-xs font-semibold text-gray-700"
    />
  );
};
