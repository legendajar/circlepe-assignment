import { useState } from 'react'
import Navbar from '../shared/Navbar/Navbar'
import ProfileSection from './ProfileSection';
import ChangePasswordSection from './ChangePasswordSection';
import OrderSection from './OrderSection';
import LoginDevicesSection from './LoginDevicesSection';
import Addresses from './Addresses';
import UpdateProfile from './UpdateProfile';

const ProfilePage = () => {
    const [navbar, setNavbar] = useState("profile");

    // Update navbar state based on user selection
    const handleNavbar = (name) => {
        setNavbar(name);
    };

    return (
        <div>
            <Navbar />
            <div className='flex flex-col mx-8 my-5'>
                <div className='w-full p-5 border shadow-md rounded-md'>
                    <div className='mx-8'>
                        {/* Navigation Tabs */}
                        <ul className='flex items-center gap-10'>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'profile' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('profile')}
                            >
                                Profile
                            </li>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'orders' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('orders')}
                            >
                                Orders
                            </li>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'changePassword' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('changePassword')}
                            >
                                Change Password
                            </li>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'loginDevices' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('loginDevices')}
                            >
                                Login Devices
                            </li>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'addresses' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('addresses')}
                            >
                                Addresses
                            </li>
                            <li 
                                className={`p-2 hover:bg-designColor hover:text-black rounded-md ${navbar === 'updateProfile' ? 'bg-designColor text-black' : ''}`}
                                onClick={() => handleNavbar('updateProfile')}
                            >
                                Update Profile
                            </li>
                        </ul>
                    </div>
                    <hr className='my-3' />

                    {/* Content Based on Selected Navbar Item */}
                    <div>
                        {navbar === 'profile' && <ProfileSection />}
                        {navbar === 'orders' && <OrderSection />}
                        {navbar === 'changePassword' && <ChangePasswordSection />}
                        {navbar === 'loginDevices' && <LoginDevicesSection />}
                        {navbar === 'addresses' && <Addresses />}
                        {navbar === 'updateProfile' && <UpdateProfile />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
