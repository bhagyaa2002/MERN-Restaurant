import React from 'react'
import logo from "../assest/cake.png";

const Order = () => {
  return (
    <div className="m-auto flex justify-center items-center">
    <div className="bg-white p-2 rounded flex w-1/2 justify-around">
      
          <div>
          <img src={logo} className="h-24 w-24" />
          </div>
          <div className='mt-9'>Cake</div>
          <div className=''>
            <div className='flex gap-12 justify-items-start'>
            <p>Qty:1</p>
            <p>Price:100</p>
            <p>Total:100</p>
            </div>
            <div>
                <p className='place-items-center'>Order Date:10/1/2024</p>
            </div>
          </div>
          <div>gnnnt</div>          
    </div>
    </div>
  )
}

export default Order