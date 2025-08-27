import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { userData } = useSelector((state) => state?.user || {});
  return (
    <div
      className="min-h-[90vh] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4  gap-8"
      style={{
        backgroundImage: 'url("/images/profile-bg.png")',
      }}
    >
      <div className="bg-transparent backdrop-blur-sm rounded-xl shadow-lg md:shadow-none flex flex-col lg:flex-row overflow-hidden md:mb-0 mb-5 w-full gap-12">
        {/* Left: Illustration and "Profile" heading */}
        <div className="relative w-full md:flex hidden md:w-1/2 h-full">
          <img
            src="/images/profile-img.png"
            alt="Profile Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Form */}
        <div className="w-[100%] md:w-[50%] lg:w-[35%] px-5 py-10 flex items-center justify-center">
          <form className="w-full space-y-5 md:shadow-green-custom rounded-lg shadow-none md:p-5 p-0">
            <div className="flex md:hidden w-[100px] mx-auto bg-white border-2 border-green-600 text-green-700 font-bold px-6 py-2 rounded-md shadow text-lg text-center">
              Profile
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={userData?.firstname + ' ' + userData?.lastname}
                readOnly
                className="w-full border border-green-500 rounded-md px-4 py-2 bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Join as
              </label>
              <input
                type="email"
                value={userData?.type}
                readOnly
                className="w-full border border-green-500 rounded-md px-4 py-2 bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={userData?.email}
                readOnly
                className="w-full border border-green-500 rounded-md px-4 py-2 bg-white focus:outline-none"
              />
            </div>
            <div
              className="flex justify-between gap-4
            "
            >
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Phone Number
                </label>
                <div className="flex w-full items-center border border-green-500 rounded-md px-4 py-2 bg-white">
                  <FaPhone className="mr-2 text-green-600" />
                  <input
                    type="tel"
                    value={userData?.mobile}
                    readOnly
                    className="bg-transparent focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pincode
                </label>
                <div className="flex items-center border border-green-500 rounded-md px-4 py-2 bg-white">
                  <input
                    type="text"
                    value={userData?.pinCode}
                    readOnly
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Address
              </label>
              <div className="flex items-center border border-green-500 rounded-md px-4 py-2 bg-white">
                <textarea
                  rows={3}
                  type="tel"
                  value={userData?.address}
                  readOnly
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
            {/* <div>
              <label className="block text-sm text-gray-600 mb-1">
                Change Password
              </label>
              <div className="flex items-center border border-green-500 rounded-md px-4 py-2 bg-white cursor-pointer hover:bg-green-50">
                <FaLock className="mr-2 text-green-600" />
                <span className="text-gray-700">Change Password</span>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
