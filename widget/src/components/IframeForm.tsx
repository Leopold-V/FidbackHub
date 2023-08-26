import { ReactNode, useEffect, useState } from 'react';
import Frame from 'react-frame-component';
import { Form } from './Form';
import { ClipLoader } from 'react-spinners';
import { InfinitySpin } from 'react-loader-spinner';

export const IframeForm = ({ Head, open, setopen, apiKey}: { Head: ReactNode, open: boolean, setopen: (open: boolean) => void, apiKey: string}) => {
   const [loading, setloading] = useState(true);

  const handleLoading = () =>  {
    setloading(true);
  }

   useEffect(() => {
    const interval = setTimeout(() => {
        setloading(false)
    }, 2000);
   
     return () => {
       clearInterval(interval);
     }
   }, [])


    return (
        <Frame head={Head} style={{ border: 'none', width: '100%', height: '100%' }} onLoad={handleLoading}>
            <div className="absolute h-full w-full">
              {
                loading ? (
                    <div className='flex justify-center items-center h-full w-full'>
                        <InfinitySpin
                          width='200'
                          color="#000000"
                        />
                    </div>
                )
                : <Form open={open} setopen={setopen} apiKey={apiKey} />
              }
            </div>
      </Frame>
    )
  }