import React, { useEffect, useRef, useState } from 'react';
import Banner from '@/components/DonateNow/Banner';
import YellowBox from '@/components/DonateNow/YellowWarning';
import OrganizerCard from '@/components/DonateNow/OrganizerCard';
import RaiseFundCard from '@/components/DonateNow/RaiseFundCard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAuthReq, postAuthReq } from '@/utils/apiHandlers';

const DonateNow = () => {
  const amounts = [50, 100, 200, 500, 1000];
  const [selectAmmount, setSelectedAmmount] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const onAmmoutClick = (ammount) => {
    setForm({ ...form, amount: ammount });
    setSelectedAmmount(ammount);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleDonteRequest = async () => {
    try {
      setLoading(true);
      if (isLoading) return;
      const payload = form?.purpose
        ? {
            amount: Number(form?.amount),
            purpose: form?.purpose,
          }
        : {
            amount: Number(form?.amount),
          };
      if (!form?.amount) {
        toast.error('Please fill amount');
        return;
      }
      const res = await postAuthReq('/payment/request', payload);
      const { status, data } = res;
      if (status) {
        handlePayment(data?.id);
        setForm({
          ...form,
          gstNumber: '',
        });
      } else {
        toast.error(res?.error.message);
      }
    } catch (error) {
      console.log(error, 'dfshfdsjh');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (paymentId) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Razorpay SDK failed to load');
      return;
    }
    const paylaod = {
      amount: Number(form?.amount),
      receipt: paymentId,
      donation_payment_id: paymentId,
    };
    const orderData = await postAuthReq('/payment/create-order', paylaod);
    const options = {
      key: process.env.REACT_APP_PUBLIC_KEY,
      amount: orderData?.data?.amount,
      currency: orderData?.data?.currency,
      name: 'Radhe Shrinivasa Foundation',
      description: 'Donation for foundation',
      order_id: orderData?.data?.order,
      config: {
        display: {
          blocks: {
            recommended: {
              name: 'Pay using recommended methods',
              instruments: [
                {
                  method: 'upi', // Show UPI under recommended
                },
              ],
            },
            utib: {
              name: 'Pay Using UPI',
              instruments: [
                {
                  method: 'upi',
                  flow: ['qr', 'collect', 'intent'],
                  apps: ['paytm', 'google_pay', 'phonepe'],
                  // issuers: ["UTIB"]
                },
                {
                  method: 'netbanking',
                  banks: ['UTIB'],
                },
              ],
            },
            other: {
              //  name for other block
              name: 'Pay using other device',
              instruments: [
                {
                  method: 'upi',
                  flow: ['collect'],
                },
                {
                  method: 'netbanking',
                },
              ],
            },
          },
          hide: [
            { method: 'paylater' },
            { method: 'card' },
            { method: 'wallet' },
          ],
          sequence: ['block.utib'],
          preferences: {
            show_default_blocks: true, // Should Checkout show its default blocks?
          },
        },
      },
      theme: {
        color: '#008000',
        hide_topbar: false,
      },
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        handleVerifyPayment(
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          paymentId,
        );
      },

      prefill: {
        name: 'Your Name',
        email: 'your_email@example.com',
        contact: '9999999999',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const handleVerifyPayment = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    paymentId,
  ) => {
    const payload = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
      purchase_payment_id: paymentId,
    };
    const res = await postAuthReq('/payment/verify-payment', payload);
    const { status, data } = res;
    if (status) {
      setSelectedAmmount('');
      setForm({});
      navigate('/donate-history');
      toast.success(data?.message);
    } else {
      if (Array.isArray(res?.error?.message)) {
        toast.error(res?.error?.message[0]);
        toast.error(res?.error?.message);
      }
      toast.error(res?.error?.message);
    }
  };

  const getCategoryList = async () => {
    try {
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
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div>
      <Banner />
      <div className="max-w-7xl mx-auto px-20 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start ">
        <div className="col-span-2">
          <YellowBox />
          <div className="bg-white rounded-lg shadow-lg py-[28px] px-[33px] w-full border-[1px] border-solid border-primary-100">
            <input
              ref={inputRef}
              type="number"
              value={form?.amount}
              className="flex h-[63px] bg-primary-100 rounded-[12px] w-full px-4 justify-center items-center text-white text-center"
              onChange={(e) => {
                setSelectedAmmount(e.target.value);
                setForm({ ...form, amount: e.target.value });
              }}
            />
            <div className="flex flex-wrap gap-3 my-4">
              {amounts.map((amount, index) => (
                <div
                  key={index}
                  className={`rounded-[12px] border border-green-500 px-4 py-2 cursor-pointer hover:bg-green-100 ${
                    selectAmmount == amount
                      ? 'text-white-700 bg-primary-100'
                      : 'text-green-700'
                  }`}
                  onClick={() => {
                    onAmmoutClick(amount);
                    inputRef.current?.focus();
                  }}
                >
                  {/* <img src="./rupee-hexagon.png" className="bg-green" /> */}
                  {amount}
                </div>
              ))}
              <div
                className={`rounded-[12px] border border-green-500 px-4 py-2 cursor-pointer hover:bg-green-100 ${
                  selectAmmount == ''
                    ? 'text-white-700 bg-primary-100'
                    : 'text-green-700'
                }`}
                onClick={() => {
                  onAmmoutClick('');
                  inputRef.current?.focus();
                }}
              >
                Custom Amount
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Purpose of Donation
                  <span className="text-red-500"> *</span>
                </label>
                <select
                  className="w-full border-2 border-green-300 rounded-md px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-green-400"
                  defaultValue=""
                  onChange={(e) => {
                    setForm({ ...form, purpose: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Select purpose
                  </option>
                  {categoryList &&
                    categoryList.map((items, index) => {
                      return (
                        <option key={index} value={items?.name}>
                          {items?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="hidden">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Card information
                </label>
                <div className="flex h-[54px] gap-x-1">
                  <div className="flex justify-center">
                    <img src="./visa.png" className="w-full max-w-md" />
                  </div>
                  <div className="flex justify-center">
                    <img src="./paytm.png" className="w-full max-w-md" />
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="./americanExpress.png"
                      className="w-full max-w-md"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-6 border-t-[1px] border-green-500 pt-4 ">
                <button
                  onClick={handleDonteRequest}
                  type="button"
                  className="border border-green-500 text-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-100 flex items-center gap-2"
                >
                  Donate Now
                  <img
                    src="./vector.png"
                    alt="icon"
                    className="w-5 h-5 rounded-full border border-green-500 p-1"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          <OrganizerCard />
          <RaiseFundCard />
        </div>
      </div>
    </div>
  );
};

export default DonateNow;
