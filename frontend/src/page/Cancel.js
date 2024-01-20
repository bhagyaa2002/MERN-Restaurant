import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Cancel = () => {
  const {id} = useParams();
  const data={
    id:id,
    activeStatus:"cancel"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const handleOrder = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/orderDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        const orderDetails = await handleOrder.json();
  
  
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    fetchData(); 
  }, [id]);
 
  console.log(id);
  return (
    <div className='bg-red-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
        <p>Payment is Canelled</p>
    </div>
  )
}

export default Cancel