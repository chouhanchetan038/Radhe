import React, { useEffect, useRef, useState } from 'react';
import { reactIcons } from '@/utils/icons';
import {
  addharCardValidation,
  otpValidation,
  panCardValidation,
} from '@/utils/validation';
import { Loading } from '@/components';
import { isYupError, parseYupError } from '@/utils/Yup';
import AadharOtpVerification from '@/components/modals/AadharOtpVerification';
import { postAuthReq } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { fetchUserData } from '@/redux/Slice/User/user';
import { useDispatch } from 'react-redux';

const Kyc = () => {
  const [activeTab, setActiveTab] = useState('aadhaar');
  const [openOtpVerification, setOpenOtpVerification] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    aadhaarNumber: '',
    panNumber: '',
    otp: '',
    mobile: '+917047576712',
  });
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [refrenceId, setRefrenceId] = useState(false);

  const tabRefs = {
    aadhaar: useRef(null),
    pan: useRef(null),
  };

  console.log(mobileOtpSent, 'mobileOtpSent');

  const [borderBoxStyle, setBorderBoxStyle] = useState({
    left: 0,
    width: 0,
    height: 0,
    top: 0,
  });

  useEffect(() => {
    const activeButton = tabRefs[activeTab].current;
    if (activeButton) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeButton;
      setBorderBoxStyle({
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
      });
    }
    //eslint-disable-next-line
  }, [activeTab]);

  const handleSentAadhaarOtp = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await addharCardValidation.validate(form, {
        abortEarly: false,
      });
      const payload = {
        aadharNumber: form.aadhaarNumber,
        // captcha: form.captcha
      };
      setTimer(120000);
      setOpenOtpVerification(true);
      const res = await postAuthReq('/kyc/generate-aadhar-otp', payload);
      const { status, data, error } = res;
      console.log(res);
      if (status) {
        setRefrenceId(data?.refrenceId);
        toast.success(data?.message);
      } else {
        toast.error(
          error?.message === 'Aadhaar number does not have mobile number'
            ? 'Your mobile number is not linked to your Aadhar.'
            : error?.message,
        );
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePanSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      const payload = {
        panNumber: form.panNumber,
      };
      await panCardValidation.validate(form, {
        abortEarly: false,
      });
      const res = await postAuthReq('/kyc/pan-varification', payload);
      const { status, data } = res;
      if (status) {
        dispatch(fetchUserData());
        toast.success(data?.status);
        setForm({
          panNumber: '',
        });
      } else {
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

  const handleVerifyOtp = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const payload = {
        otp: form.otp,
        mobileNumber: form.mobileNumber,
        refrenceId: refrenceId,
      };
      await otpValidation.validate(form, {
        abortEarly: false,
      });
      const res = await postAuthReq('/kyc/verify-aadhar-otp', payload);
      const { status, data } = res;
      if (status) {
        setForm({
          otp: '',
          mobileNumber: '',
        });
        toast.success(
          data?.status == 'success'
            ? 'Your Aadhaar verification has been successfully completed'
            : data?.status,
        );
        dispatch(fetchUserData());
      } else {
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

  const formatAadhaar = (value) => {
    if (!value) return '';
    return (
      value
        .replace(/\D/g, '')
        .match(/.{1,4}/g)
        ?.join('-')
        .substr(0, 14) || ''
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-[90vh] bg-green-50 flex flex-col items-center justify-center px-4 py-10">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <img
              src="./Group.png"
              alt="KYC Illustration"
              className="w-full max-w-md"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
            <h3 className="text-green-600 text-xl font-bold">KYC</h3>

            <div className="relative flex justify-between items-center w-full px-6 mb-4 py-6">
              <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-300 z-0" />
              <div
                className="absolute top-1/2 left-6 h-0.5 bg-green-500 z-0 transition-all duration-500 ease-in-out"
                style={{
                  width: activeTab === 'aadhaar' ? '0%' : 'calc(100% - 3rem)',
                }}
              />
              <div className="flex flex-col select-none z-10 relative items-center">
                <div className="w-6 h-6 rounded-full grid place-items-center font-bold text-white text-xs transition-colors duration-500 bg-green-500">
                  1
                </div>
                <span className="text-xs absolute w-12 text-center top-full pt-3">
                  Aadhaar
                </span>
              </div>
              <div className="flex flex-col select-none relative z-10 items-center">
                <div
                  className={`w-6 h-6 rounded-full grid place-items-center font-bold text-white text-xs transition-colors duration-500 ${
                    activeTab === 'pan' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  2
                </div>
                <span className="text-xs absolute w-12 text-center top-full pt-3">
                  PAN
                </span>
              </div>
            </div>

            <div className="relative flex mb-6 p-1 bg-green-500 rounded">
              <div
                className="absolute border-2 border-white rounded-md transition-all duration-300 ease-in-out pointer-events-none"
                style={borderBoxStyle}
              />
              <button
                ref={tabRefs.aadhaar}
                onClick={() => setActiveTab('aadhaar')}
                className="flex-1 px-4 py-2 text-white font-semibold z-10"
              >
                Aadhaar Card
              </button>
              <button
                ref={tabRefs.pan}
                onClick={() => setActiveTab('pan')}
                className="flex-1 px-4 py-2 text-white font-semibold z-10"
              >
                PAN Card
              </button>
            </div>

            <div className="flex  gap-x-2 bg-green-50 border border-green-500 text-green-700 text-sm rounded-md p-2 mb-6">
              <div className="flex items-center justify-center mt-1">
                {reactIcons.info}
              </div>
              <div className="text-black tex-sm ">
                {activeTab === 'aadhaar' ? (
                  <p>
                    An Aadhaar card will be sent to the users with the KYC.
                    Please make sure to provide the subject and body for that
                    Aadhaar card.
                  </p>
                ) : (
                  <p>
                    A PAN card will be sent to the users with the KYC. Please
                    make sure to provide the subject and body for that PAN card.
                  </p>
                )}
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-base font-medium mb-1 text-gray-700">
                  {activeTab === 'aadhaar'
                    ? 'Enter Your Aadhaar Card Number'
                    : 'Enter Your PAN Card Number'}
                  <span className="text-red-500"> *</span>
                </label>
                {activeTab === 'aadhaar' ? (
                  <input
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    name="aadhaarNumber"
                    value={formatAadhaar(form?.aadhaarNumber)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '');
                      if (rawValue.length <= 12) {
                        setForm((prev) => ({
                          ...prev,
                          aadhaarNumber: rawValue,
                        }));
                        setFormError((prev) => ({
                          ...prev,
                          aadhaarNumber: '',
                        }));
                      }
                    }}
                    className="w-full border-2 border-green-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Enter PAN card number"
                      name="panNumber"
                      value={form?.panNumber}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        if (value.length <= 10) {
                          setForm((prev) => ({ ...prev, panNumber: value }));
                          setFormError((prev) => ({
                            ...prev,
                            panNumber: '',
                          }));
                        }
                      }}
                      className="w-full border-2 border-green-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </>
                )}
                {formError?.aadhaarNumber ? (
                  <div className="text-red-500 px-2 text-14">
                    {formError?.aadhaarNumber}
                  </div>
                ) : formError?.panNumber ? (
                  <div className="text-red-500 px-2 text-14">
                    {formError?.panNumber}
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="flex items-center justify-end gap-4 mt-6 border-t-[1px] border-green-500 pt-4">
                <button
                  type="reset"
                  className="border border-green-500 text-green-500 px-6 py-2 rounded-full font-semibold text-base hover:bg-green-100"
                  onClick={() =>
                    setForm({ ...form, aadhaarNumber: '', panNumber: '' })
                  }
                >
                  Reset
                </button>

                <button
                  type="submit"
                  onClick={
                    activeTab === 'aadhaar'
                      ? handleSentAadhaarOtp
                      : handlePanSubmit
                  }
                  className="border border-green-500 text-green-500 px-6 py-2 rounded-full font-semibold text-base hover:bg-green-100"
                >
                  {activeTab === 'aadhaar' ? 'Sent OTP' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {openOtpVerification && (
        <AadharOtpVerification
          form={form}
          setForm={setForm}
          handleSentMobileOtp={handleSentAadhaarOtp}
          open={openOtpVerification}
          setOpen={setOpenOtpVerification}
          formError={formError}
          setFormError={setFormError}
          timer={timer}
          setTimer={setTimer}
          setMobileOtpSent={setMobileOtpSent}
          isLoading={isLoading}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
    </>
  );
};

export default Kyc;
