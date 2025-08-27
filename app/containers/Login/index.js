import { fetchUserData } from '@/redux/Slice/User/user';
import { isLoggedIn, postReq } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
import { loginValidation } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
const initialState = {
  mobile: '',
  password: '',
};
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [formError, setFormError] = useState(initialState);
  const [focusedInput, setFocusedInput] = useState(null);
  const dispatch = useDispatch();
  const isLogin = isLoggedIn();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await loginValidation.validate(form, {
        abortEarly: false,
      });
      const res = await postReq('/auth/login', {
        ...form,
        emailOrMobile: '+91' + form?.mobile,
      });
      const { status, data } = res;
      if (status) {
        Cookies.set('accessToken', data.accessToken);
        dispatch(fetchUserData());
        if (data?.isVerified) {
          navigate('/profile');
        } else {
          navigate('/kyc');
        }
        toast.success('Login Successfully');
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleFocus = (name) => {
    setFocusedInput(name);
  };

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className="min-h-[90vh] bg-green-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 rounded-lg shadow-lg">
        {/* Left: Image */}
        <div className="md:flex hidden justify-center">
          <img
            src="/images/joinup-img.png"
            alt="Login Illustration"
            className="w-full max-w-[500px]"
          />
        </div>

        {/* Right: Login Form */}
        <div>
          <h2 className="text-xl font-bold mb-2">👋 Welcome Back!</h2>
          <p className="text-lg text-black mb-6">Log in to your account</p>

          <form className="space-y-5">
            <div>
              <label className="text-base font-medium">
                Mobile <span className="text-red-700">*</span>
              </label>
              <input
                type="number"
                onChange={handleChange}
                onFocus={() => handleFocus('mobile')}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'Minus') {
                    e.preventDefault();
                  }
                }}
                name="mobile"
                className={`w-full px-4 py-2 mt-1 border rounded-md text-black text-base focus:outline-none ${
                  focusedInput === 'mobile'
                    ? '!border-[#EE0000]'
                    : 'border-[#BEBEBE]'
                }`}
                placeholder="Enter your mobile"
              />
              {formError.mobile && (
                <div className="form-eror">{formError.mobile}</div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mt-3 text-base">
                <label className="text-base font-medium">
                  Password <span className="text-red-700">*</span>
                </label>{' '}
                <span
                  onClick={() => navigate('/forgot-password')}
                  className="text-green-600 text-sm hover:underline cursor-pointer"
                >
                  🔑 Forgot Password?
                </span>
              </div>
              <div className="relative mt-1">
                <input
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-4 py-2 border rounded-md bg-white text-black focus:outline-none ${
                    focusedInput === 'password'
                      ? '!border-[#EE0000]'
                      : 'border-[#BEBEBE]'
                  }`}
                  placeholder="Enter your password"
                />
                {/* Eye Icon */}
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
              </div>
              {formError.password && (
                <div className="form-eror">{formError.password}</div>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-8 bg-green-600 text-white py-2 hover:bg-green-700 transition rounded-full"
            >
              Log In
            </button>

            <p className="text-base font-medium mt-6 text-[#7C7474]">
              Don&apos;t have an account? Register as{' '}
              <span
                onClick={() => navigate('/signup/donator')}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Donor
              </span>{' '}
              OR{' '}
              <span
                onClick={() => navigate('/signup/volunteer')}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Voulnteer
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
