import { Loading } from '@/components';
import { postReq } from '@/utils/apiHandlers';
import { formatTime } from '@/utils/constants';
import { reactIcons } from '@/utils/icons';
import {
  forgotPasswordValidation,
  mobileOtpValidation,
} from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

const initialState = {
  code: '',
  mobile: '',
  newPassword: '',
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [timer, setTimer] = useState(0);
  const [formError, setFormError] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const [mobileOtpSent, setMobileOtpSent] = useState(false);

  const handleSentMobileOtp = async () => {
    if (isLoading) return;
    if (timer == 0) {
      try {
        setIsLoading(true);
        await mobileOtpValidation.validate(form, {
          abortEarly: false,
        });
        const payload = {
          mobile: '+91' + form.mobile,
        };
        const res = await postReq('/auth/forgot-password', payload);
        const { status, data } = res;
        if (status) {
          setTimer(data?.mobile?.timeout);
          setForm({ ...form, code: '' });
          setStep(2);
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
        `Resend verification code on +91${+form?.mobile} not allowed with in 5 minutes`,
      );
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (form?.code && form.code.length === 6) {
      toast.dismiss();
      toast.success('Otp submitted successfully');
      setStep(3);
      setTimer(0);
    } else {
      setFormError({ code: 'Please enter otp' });
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    const newTimer = setInterval(() => {
      setTimer((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(newTimer);
  }, [timer, setTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await forgotPasswordValidation.validate(form, {
        abortEarly: false,
      });
      const payload = { ...form, mobile: '+91' + form.mobile };
      const res = await postReq('/auth/reset-password', payload);
      const { status } = res;
      if (status) {
        toast.success('Password reset successfully!');
        navigate('/profile');
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

  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  p-6 rounded-lg shadow-lg">
          {/* Left: Image */}
          <div className="md:flex hidden  justify-center">
            <img
              src="/images/joinup-img.png"
              alt="Login Illustration"
              className="w-full max-w-[500px]"
            />
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-xl font-bold mb-2">🔒 Forgot Password</h2>
            <p className="text-sm text-gray-600 mb-6">
              Recover your account easily
            </p>

            {/* Step 1 - Enter Mobile */}
            {step === 1 && (
              <form className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Mobile Number *</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 mt-1 border rounded-md"
                    placeholder="Enter your Phone Number"
                    value={form?.mobile}
                    onChange={(e) => {
                      setForm({ ...form, mobile: e.target.value });
                      setFormError({ ...form, mobile: '' });
                    }}
                    // required
                  />
                  {formError.mobile && (
                    <div className="form-eror">{formError.mobile}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSentMobileOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  Send OTP
                </button>
              </form>
            )}

            {/* Step 2 - Verify OTP */}
            {step === 2 && (
              <>
                <div className="max-w-sm mt-4 mx-auto mb-8">
                  <p className="text-12 lg:text-16  text-center mb-8">
                    We have sent you a 6 digit OTP on your Mobile Number +91
                    {form?.mobile.slice(0, 3)} *****
                    {form?.mobile.slice(-3)}
                  </p>
                </div>
                <form className="space-y-5">
                  <div>
                    <label className="text-sm font-medium">Enter OTP *</label>
                    <div className="mt-2">
                      <OtpInput
                        value={form?.code}
                        onChange={(otp) => {
                          setForm((prev) => ({ ...prev, code: otp }));
                          setFormError((prev) => ({
                            ...prev,
                            code: '',
                          }));
                        }}
                        containerStyle={{ width: '100%' }}
                        inputStyle={{
                          paddingLeft: '0.5rem',
                          paddingRight: '0.5rem',
                          color: 'black',
                          width: '100%',
                          height: '50px',
                          borderRadius: '6px',
                          outline: 'none',
                          border: `1px solid ${
                            formError.code ? '#C31515' : 'white'
                          } `,
                          background: 'transparent',
                          boxShadow: formError.code
                            ? '0px 2.73px 2.73px 0px #C31515, 8.88px 5.46px 21.17px 0px #C31515'
                            : '0px 2.73px 2.73px 0px #008000, 8.88px 5.46px 21.17px 0px #008000',
                        }}
                        numInputs={6}
                        isInputNum={true}
                        renderSeparator={<span className="mr-3"> </span>}
                        renderInput={(inputProps, index) => (
                          <input
                            {...inputProps}
                            key={index}
                            placeholder="-"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="text-white"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                          />
                        )}
                      />
                      {formError.code && (
                        <p className="text-16 mt-3 text-[#EE0000]">
                          {formError?.code}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleVerifyOtp}
                    className="w-full mt-5 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Verify OTP
                  </button>
                  <div className="flex justify-end">
                    <p className=" text-12  mt-5">
                      <span className="text-black">
                        {' '}
                        Didn&apos;t receive the code?{' '}
                      </span>
                      {timer > 0 ? (
                        <span className="text-[#EE0000] underline">
                          Resend Again ({formatTime(timer)})
                        </span>
                      ) : (
                        <span
                          className="text-[#EE0000] cursor-pointer underline"
                          onClick={() => handleSentMobileOtp()}
                        >
                          Resend OTP
                        </span>
                      )}
                    </p>{' '}
                  </div>
                </form>
              </>
            )}

            {/* Step 3 - Reset Password */}
            {step === 3 && (
              <form className="space-y-5">
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    name={'newPassword'}
                    value={form?.newPassword}
                    onChange={(e) =>
                      setForm({ ...form, newPassword: e.target.value })
                    }
                    className="w-full pl-4 py-2 pr-10 border rounded-md bg-white focus:outline-none text-black"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 top-0 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      // Eye Off Icon
                      <span className="text-22">{reactIcons.eyeVisible}</span>
                    ) : (
                      // Eye Icon
                      <span className="text-22">{reactIcons.eyeInVisible}</span>
                    )}
                  </button>
                  {formError?.newPassword && (
                    <div className="form-eror">{formError?.newPassword}</div>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
