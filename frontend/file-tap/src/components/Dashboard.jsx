import { useState, useEffect } from "react"
import React from 'react'

const Dashboard = () => {
    const [count, setCount] = useState(0)




    return (
        <div className='h-lvh  place-content-center flex justify-around m-5 border'>

            <div className='w-150  place-content-center'>
                <div className='border h-10 rounded-md'>
                    file
                </div>
            </div>

            <div className='w-50  place-content-center'>
                <div className="border h-10 w-40 rounded-md flex justify-center bg-emerald-300">
                    <button onClick={() => { setCount(count + 1) }}>
                        {count}
                        View
                    </button>
                </div>
            </div>

            <div className='w-50  place-content-center'>
                <div className="border h-10 w-40 rounded-md flex justify-center bg-gray-500">
                    <button>
                        Download
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
