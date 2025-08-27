import { postReq } from '@/utils/apiHandlers';
import { contactFormValidation } from '@/utils/validation';
import { isYupError, parseYupError } from '@/utils/Yup';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevData) => ({
      ...prevData,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      await contactFormValidation.validate(formData, {
        abortEarly: false,
      });
      const res = await postReq('/contact-us', formData);
      const { status } = res;
      if (status) {
        toast.success(
          'Your message has been sent successfully! We will get back to you shortly.',
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      if (isYupError(error)) {
        setErrors(parseYupError(error));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="bg-cover bg-center font-sans py-12"
      style={{ backgroundImage: 'url(/images/contact-bg.png)' }}
    >
      <div className="flex flex-col md:flex-row justify-center w-full max-w-6xl px-8 py-12 space-y-8 md:space-y-0 mx-auto">
        {/* Left Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }} // Slide from left
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-bold mb-4 text-center md:text-left text-black">
            Get in Touch
          </h1>
          <p className="text-black text-lg text-center md:text-left">
            Have questions or want to get involved? Reach out to us.
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="md:w-1/2 bg-white rounded-xl border border-green-100 p-6 shadow-md"
          initial={{ opacity: 0, x: 100 }} // Slide from right
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-gray-100 w-full p-3 rounded-md outline-none"
                onChange={handleChange}
                value={formData?.name}
                name="name"
              />
              {errors.name && <div className="form-eror">{errors.name}</div>}
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-100 w-full p-3 rounded-md outline-none"
                onChange={handleChange}
                value={formData?.email}
                name="email"
              />
              {errors.email && <div className="form-eror">{errors.email}</div>}
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Subject"
                className="bg-gray-100 w-full p-3 rounded-md outline-none"
                onChange={handleChange}
                value={formData?.subject}
                name="subject"
              />
              {errors.subject && (
                <div className="form-eror">{errors.subject}</div>
              )}
            </div>
            <div className="w-full">
              <textarea
                rows="4"
                placeholder="Your Message"
                className="bg-gray-100 w-full p-3 rounded-md outline-none"
                onChange={handleChange}
                value={formData?.message}
                name="message"
              ></textarea>
              {errors.message && (
                <div className="form-eror">{errors.message}</div>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition flex items-center justify-center"
            >
              Leave us a Message →
            </button>
          </form>
        </motion.div>
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-8 py-12">
        {/* Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4"
        >
          <div>
            <div className="bg-mint-light mb-2 flex gap-2 items-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail h-5 w-5 text-mint-dark"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <h3 className="font-medium text-gray-900">Email</h3>
            </div>

            <p className="mt-1 text-gray-600">
              info@radheshrinivasafoundation.com
            </p>
          </div>
        </motion.div>

        {/* Phone Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4"
        >
          <div>
            <div className="bg-mint-light mb-2 flex gap-2 items-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone h-5 w-5 text-mint-dark"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <h3 className="font-medium text-gray-900">Phone</h3>
            </div>

            <p className="mt-1 text-gray-600">+91 9226436920</p>
          </div>
        </motion.div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4"
        >
          <div>
            <div className="bg-mint-light mb-2 flex gap-2 items-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin h-5 w-5 text-mint-dark"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h3 className="font-medium text-gray-900">Location</h3>
            </div>

            <p className="mt-1 text-gray-600">
              Shop No.A-112, Little Earth Commercial society Survey No:19/1 to
              7, Kivale (malwadi) Tehsil Haveli Dist Pune 412101 Maharastra
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
