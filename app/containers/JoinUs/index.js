import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isYupError, parseYupError } from '../../utils/Yup';
import {
  mobileOtpValidation,
  userRegistrationValidation,
} from '@/utils/validation';
import { getAuthReq, isLoggedIn, postReq } from '@/utils/apiHandlers';
import Cookies from 'js-cookie';
import Loader from '@/components/loaders/Loader';
import OtpVerificationModal from '@/components/modals/OtpVerificationModal';
import toast from 'react-hot-toast';
import { formFields } from '@/utils/constants';
import { Loading } from '@/components';
import { reactIcons } from '@/utils/icons';

const initialise = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  password: '',
  verificationCode: '',
  type: '',
  country: 'India',
  dialCode: '+91',
  categories: [],
};
const JoinUs = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  const isLogin = isLoggedIn();
  const [openOtpVerification, setOpenOtpVerification] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [formData, setFormData] = useState(initialise);
  const [formError, setFormError] = useState(initialise);
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  useEffect(() => {
    if (type) {
      setFormData((prev) => ({
        ...prev,
        type: type == 'volunteer' ? 'Volunteer' : 'Donator',
      }));
    }
  }, [type]);

  const toggleCause = (cause) => {
    if (formData.categories.includes(cause)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((c) => c !== cause),
      });
      setFormError((prev) => ({
        ...prev,
        categories: [],
      }));
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, cause],
      });
      setFormError((prev) => ({
        ...prev,
        categories: [],
      }));
    }
  };

  const handleSentMobileOtp = async () => {
    if (isLoading) return;
    if (timer == 0) {
      try {
        setIsLoading(true);
        await mobileOtpValidation.validate(formData, {
          abortEarly: false,
        });
        const payload = {
          mobile: formData?.dialCode + formData.mobile,
          type: 'register',
          country: formData?.country,
        };
        const res = await postReq('/auth/send-code', payload);
        const { status, data } = res;
        if (status) {
          setTimer(data?.mobile?.timeout);
          setFormData({ ...formData, verificationCode: '' });
          setMobileOtpSent(true);
          setOpenOtpVerification(true);
          toast.success('OTP Send Successfully');
        } else {
          if (Array.isArray(res?.error?.message)) {
            toast.dismiss();
            toast.error(res?.error?.message[0]);
          } else {
            toast.dismiss();
            toast.error(res?.error?.message);
          }
        }
      } catch (error) {
        if (isYupError(error)) {
          setFormError(parseYupError(error));
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error(
        `Resend verification code on ${
          formData?.dialCode + formData?.mobile
        } not allowed with in 5 minutes`,
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await userRegistrationValidation.validate(formData, {
        abortEarly: false,
      });
      if (!formData?.verificationCode) {
        toast.error('Please verify your mobile by otp');
        return;
      }
      const payload = {
        ...formData,
        mobile: formData?.dialCode + formData?.mobile,
      };
      const res = await postReq('/auth/register', payload);
      const { status, data } = res;
      if (status) {
        Cookies.set('accessToken', data.accessToken);
        navigate('/profile');
        setFormData({});
        setFormError({});
        toast.success('Register Successfully');
      } else {
        if (Array.isArray(res?.error?.message)) {
          toast.error(res?.error?.message[0]);
          toast.error(res?.error?.message);
        }
        toast.error(res?.error?.message);
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const getCategoryList = async () => {
    try {
      setIsLoading(true);
      const response = await getAuthReq('/categories?status=Active');
      const { status, data, error } = response;
      if (status) {
        setCategoryList(data?.data);
      } else {
        if (Array.isArray(error?.message)) {
          toast.error(error.message[0]);
        } else {
          toast.error(error?.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch category list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-5">
        <div className="max-w-6xl w-full  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 rounded-lg shadow-lg">
          {/* Left Image */}
          <div className="md:flex hidden justify-center">
            <img
              src="/images/joinup-img.png"
              alt="Join Us Illustration"
              className="w-full max-w-[500px]"
            />
          </div>

          {/* Right Form */}
          <div>
            <h2 className="text-xl font-bold mb-6">
              👋 Welcome To Radhe Shrinivasa Foundation
            </h2>

            <form className="space-y-4">
              <div className="space-y-4">
                {/* First Name and Last Name in same row */}
                <div className="flex flex-col md:flex-row md:gap-4">
                  {formFields.slice(0, 2).map((field, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 ld:mb-0  ${idx == 0 ? 'mb-2' : ''}`}
                    >
                      <label className="text-base font-medium">
                        {field.label}{' '}
                        {field.required && (
                          <span className="text-red-700">*</span>
                        )}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        name={field.label.toLowerCase().replace(' ', '')}
                        value={
                          formData[field.label.toLowerCase().replace(' ', '')]
                        }
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-1 border rounded-lg text-base text-black focus:outline-none"
                      />
                      {formError[
                        field.label.toLowerCase().replace(' ', '')
                      ] && (
                        <div className="form-eror">
                          {
                            formError[
                              field.label.toLowerCase().replace(' ', '')
                            ]
                          }
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Email separately */}
                <div>
                  <label className="text-base font-medium">
                    Email <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg text-base text-black focus:outline-none"
                  />
                  {formError.email && (
                    <div className="form-eror">{formError.email}</div>
                  )}
                </div>

                {/* Mobile + Pincode in one row */}
                <div className="flex flex-col md:flex-row md:gap-4">
                  {/* Mobile */}
                  <div className="flex-1">
                    <label className="text-base font-medium">
                      Mobile <span className="text-red-700">*</span>
                    </label>
                    <div className="flex py-[2px] border rounded-lg bg-white mt-1">
                      <input
                        type="tel"
                        placeholder="Enter your mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-base text-black focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'Minus') {
                            e.preventDefault();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleSentMobileOtp}
                        className={`text-white px-4 rounded-r-md mr-1 ${
                          mobileOtpSent ? 'bg-green-600' : 'bg-[#EE0000]'
                        }`}
                      >
                        {isLoading ? (
                          <Loader />
                        ) : mobileOtpSent ? (
                          'SENT'
                        ) : (
                          'OTP'
                        )}
                      </button>
                    </div>
                    {formError.mobile && (
                      <div className="form-eror">{formError.mobile}</div>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="flex-1">
                    <label className="text-base font-medium">
                      Pincode <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter your Pincode"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      className="w-full px-4 py-2 mt-1 border rounded-lg text-base text-black focus:outline-none"
                    />
                    {formError.pinCode && (
                      <div className="form-eror">{formError.pinCode}</div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-base font-medium">
                    Address <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    placeholder="Enter your Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-lg text-base text-black focus:outline-none"
                    rows={1}
                  />
                  {formError.address && (
                    <div className="form-eror">{formError.address}</div>
                  )}
                </div>

                {/* Password */}
                <div className="relative mt-1">
                  <label className="text-base font-medium">
                    Password <span className="text-red-700">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-4 py-2 pr-10 border rounded-md bg-white focus:outline-none text-black mt-1"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 top-7 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <span className="text-22">{reactIcons.eyeVisible}</span>
                    ) : (
                      <span className="text-22">{reactIcons.eyeInVisible}</span>
                    )}
                  </button>
                  {formError.password && (
                    <div className="form-eror">{formError.password}</div>
                  )}
                </div>
              </div>

              {/* Causes */}
              <div>
                <label className="text-base font-medium block mb-2">
                  Which Cause would you like to support with us?
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categoryList &&
                    categoryList.map((cause, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCause(cause?.id)}
                        className={`px-3 md:px-6 py-1 md:py-2 border rounded-xl text-12 md:text-14 cursor-pointer ${
                          formData.categories.includes(cause?.id)
                            ? 'border-primary-100 text-primary-100 bg-green-100'
                            : 'bg-white text-[#767676] hover:bg-green-100 hover:border-primary-100 hover:text-primary-100'
                        }`}
                      >
                        {cause?.name}
                      </button>
                    ))}
                </div>
                {formError?.categories && (
                  <div className="form-eror">{formError?.categories}</div>
                )}
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-8 rounded-full hover:bg-green-700 mt-6"
              >
                {isLoading ? <Loader /> : 'Join Us'}
              </button>

              <p className="text-base text-[#7C7474] mt-6">
                You have an account?{' '}
                <span
                  onClick={() => navigate('/login')}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
        {openOtpVerification && (
          <OtpVerificationModal
            form={formData}
            setForm={setFormData}
            handleSentMobileOtp={handleSentMobileOtp}
            open={openOtpVerification}
            setOpen={setOpenOtpVerification}
            formError={formError}
            setFormError={setFormError}
            timer={timer}
            setTimer={setTimer}
            setMobileOtpSent={setMobileOtpSent}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default JoinUs;
