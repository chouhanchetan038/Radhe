import React, { useEffect, useState, useRef } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import JoinUsType from '../modals/JoinUsType';
import { fetchUserData, logout } from '@/redux/Slice/User/user';
import { useDispatch } from 'react-redux';
import { isLoggedIn, postAuthReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Loading from '../Loading';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openJoinType, setOpenJoinType] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = isLoggedIn();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserData());
    };
    if (isLogin) {
      fetchData();
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogOut = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await postAuthReq('/auth/logout');
      const { data } = res;
      if (res?.error?.message == 'Unauthorized') {
        toast.success('Logged Out Successfully');
        dispatch(logout());
        Object.keys(Cookies.get()).forEach(function (cookie, attributes) {
          Cookies.remove(cookie, attributes);
        });
        return navigate('/');
      }
      if (data.status === 'success') {
        toast.success('Logged Out Successfully');
        dispatch(logout());
        Object.keys(Cookies.get()).forEach(function (cookie, attributes) {
          Cookies.remove(cookie, attributes);
        });
        return navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (sectionId, navigate, location) => {
    if (location?.pathname === '/') {
      const el = document.querySelector(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = sectionId;
      }
    } else {
      navigate(`/${sectionId}`);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <nav className="bg-white shadow-sm py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/images/logo/logo-rkf.png"
              alt="Logo"
              className="w-[9%] min-w-[140px] max-w-[80px] object-contain"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
            {[
              { label: 'About Us', id: '#about' },
              { label: 'Our Initiatives', id: '#initiatives' },
              { label: 'Programs', id: '#programs' },
              { label: 'Gallery', id: '#gallery' },
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavigation(item.id, navigate, location)}
                className="relative cursor-pointer font-semibold text-gray-700 hover:text-green-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </li>
            ))}
            <li
              onClick={() => navigate('/contact-us')}
              className="relative cursor-pointer font-semibold text-gray-700 hover:text-green-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </li>
          </ul>

          {/* Desktop Profile + Auth Buttons */}
          <div className="gap-2 flex items-center ml-auto mr-2 md:ml-0 md:mr-0">
            {isLogin ? (
              <div
                className="relative ml-2 p-[8px] w-14 bg-white border border-primary-100 rounded-[6px] shadow-lg z-50 text-center flex align-center md:flex hidden"
                ref={profileRef}
              >
                <button
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  className="text-green-700 hover:text-green-800 text-xl flex align-center justify-center items-center pr-2"
                >
                  <FaUserCircle />
                  <FaChevronDown className="inline ml-2 text-sm" />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-[2rem] w-32 bg-white border border-primary-100 rounded shadow-lg z-50">
                    <ul className="text-sm text-gray-700">
                      <li
                        onClick={() => navigate('/profile')}
                        className="justify-start items-center px-2 py-2 flex gap-2 hover:bg-[#defde7] cursor-pointer"
                      >
                        {reactIcons?.user} Profile
                      </li>
                      <li
                        onClick={() => navigate('/kyc')}
                        className="justify-start items-center px-2 py-2 flex gap-2 hover:bg-[#defde7] cursor-pointer"
                      >
                        {reactIcons?.kyc} KYC
                      </li>
                      <li
                        onClick={() => navigate('/donate-now')}
                        className="justify-start items-center px-2 py-2 flex gap-2 hover:bg-[#defde7] cursor-pointer"
                      >
                        {reactIcons?.donate} Donate
                      </li>
                      <li
                        onClick={() => navigate('/donate-history')}
                        className="justify-start items-center px-2 py-2 flex gap-2 hover:bg-[#defde7] cursor-pointer"
                      >
                        {reactIcons?.book} Transactions
                      </li>
                      <li
                        onClick={handleLogOut}
                        className="justify-start items-center px-2 py-2 flex gap-2 hover:bg-[#defde7] cursor-pointer"
                      >
                        {reactIcons?.logout} Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setOpenJoinType(true)}
                  className="bg-green-600 hover:bg-green-700 border hidden md:block border-green-600 text-white text-sm px-5 py-2 rounded-full"
                >
                  Join us
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white border border-green-600 hover:text-green-700 hidden md:block text-green-600 text-sm px-5 py-2 rounded-full"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="text-green-700" onClick={toggleMenu}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 z-50 mt-4 w-[250px] h-full bg-white shadow-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="mr-2">
                <FaTimes size={22} className="text-green-700 " />
              </button>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-gray-700 font-medium px-4">
              {[
                { label: 'About Us', id: '#about' },
                { label: 'Our Initiatives', id: '#initiatives' },
                { label: 'Programs', id: '#programs' },
                { label: 'Gallery', id: '#gallery' },
              ].map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.id, navigate, location);
                    toggleMenu();
                  }}
                  className="relative cursor-pointer font-medium text-gray-700 hover:text-green-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </li>
              ))}
              <li
                onClick={() => {
                  navigate('/contact-us');
                  toggleMenu();
                }}
                className="relative cursor-pointer font-medium text-gray-700 hover:text-green-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact
              </li>

              {isLogin && (
                <>
                  <li
                    onClick={() => {
                      navigate('/profile');
                      toggleMenu();
                    }}
                    className="cursor-pointer px-0 py-0 md:px-2 md:py-2 flex gap-2 items-center hover:bg-[#defde7]"
                  >
                    <span className="hidden md:inline">{reactIcons?.user}</span>{' '}
                    Profile
                  </li>
                  <li
                    onClick={() => {
                      navigate('/kyc');
                      toggleMenu();
                    }}
                    className="cursor-pointer px-0 py-0 md:px-2 md:py-2 flex gap-2 items-center hover:bg-[#defde7]"
                  >
                    <span className="hidden md:inline">{reactIcons?.kyc}</span>{' '}
                    KYC
                  </li>
                  <li
                    onClick={() => {
                      navigate('/donate-history');
                      toggleMenu();
                    }}
                    className="cursor-pointer px-0 py-0 md:px-2 md:py-2 flex gap-2 items-center hover:bg-[#defde7]"
                  >
                    <span className="hidden md:inline">{reactIcons?.book}</span>{' '}
                    Transactions
                  </li>
                  <li
                    onClick={() => {
                      handleLogOut();
                      toggleMenu();
                    }}
                    className="cursor-pointer 
             flex justify-center md:justify-start items-center 
             md:px-2 md:py-2 
             bg-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-700 transition 
             md:bg-transparent md:text-black  md:rounded-none md:text-base md:font-normal md:hover:bg-[#defde7] 
             text-center md:text-left"
                  >
                    <span className="hidden md:inline">
                      {reactIcons?.logout}
                    </span>{' '}
                    Logout
                  </li>
                </>
              )}
            </ul>

            {!isLogin && (
              <div className="px-4 gap-2 mt-3 flex flex-col">
                <button
                  onClick={() => setOpenJoinType(true)}
                  className="bg-green-600 hover:bg-green-700 border border-green-600 text-white text-sm px-5 py-2 rounded-full"
                >
                  Join us
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white border border-green-600 hover:text-green-700 text-green-600 text-sm px-5 py-2 rounded-full"
                >
                  Login
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Join Us Modal */}
        {openJoinType && (
          <JoinUsType open={openJoinType} setOpen={setOpenJoinType} />
        )}
      </nav>
    </>
  );
};

export default Navbar;
