import React, { useState } from 'react';

const SecretKey = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <span className="font-semibold">{label}:</span>
      <div className="flex items-center">
        <div
          className="font-medium rounded text-gray-700 focus:outline-none focus:bg-white w-60 overflow-hidden overflow-ellipsis"
        >
          {value}
          </div>
        <button onClick={copyToClipboard} className="px-2 py-1 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
        </button>
        {copied && <span className="ml-2 text-gray-600">Copied!</span>}
      </div>
    </div>
  );
};

export default SecretKey;
