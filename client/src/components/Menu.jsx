import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom';

const Menu = () => {
    return (
        <div className='bg-white border border-gray-200 w-50 flex flex-col gap-1 mt-0 mb-0 px-2 pt-4  overflow-y-clip sticky top-0'>
            <NavLink
                to="#"
                className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>Home</span>
            </NavLink><hr className='border-b  mt-5 ' />
            <NavLink
                to="#"
                className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>My Campaigns</span>
            </NavLink>
            <NavLink 
                to="#"
                className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>Project</span>
            </NavLink>
            <NavLink 
                to="#"
                className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>Request</span>
            </NavLink>
            <NavLink 
                to="#"
               className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>Request Status</span>
            </NavLink>
            <NavLink
                to="#"
                className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                <span>History</span>
            </NavLink>
            <div className='w-44 justify-center items-center border-t border-gray-300 py-2 px-2 sticky'>
                <div className='flex flex-col bg-gray-100 rounded-lg'>
                    <div>
                        <img src={assets.sample} alt="" className='rounded-t-lg rounded-b-none h-20 w-full' />
                    </div>
                    <h1 className=' text-left font-medium px-2 py-1'>Media Kit</h1>
                    <hr className='border-gray-300 ml-2 mr-2' />
                    <NavLink 
                        to="#"
                        className=' text-left text-sm px-2 py-2 hover:bg-gray-200 rounded'>Followers</NavLink>
                </div>
            </div>
            <div className='mt-auto flex flex-col gap-0 border-t border-gray-300 py-2 px-2'>
                <NavLink 
                    to="#"
                    className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                    <span>Account</span>
                </NavLink>
                <NavLink 
                    to="#"
                    className='flex items-center gap-2 text-left px-2 py-2 hover:bg-gray-100 rounded'>
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Menu;
