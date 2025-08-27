import * as yup from 'yup';
import { passwordRegex } from './regex';

export const signUpValidation = yup.object().shape({
  email: yup
    .string()
    .required('Please enter you email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email',
    ),
});

export const userRegistrationValidation = yup.object().shape({
  firstname: yup
    .string()
    .required('Please enter your first name')
    .max(50, 'First Name length invalid')
    .matches(/^[^\s]+$/, 'First name should not contain spaces')
    .matches(
      /^[A-Za-z]+$/,
      'First name should contain only letters, no numbers or special characters',
    ),
  lastname: yup
    .string()
    .required('Please enter your last name')
    .max(50, 'Last Name length invalid')
    .matches(/^[^\s]+$/, 'Last name should not contain spaces')
    .matches(
      /^[A-Za-z]+$/,
      'Last name should contain only letters, no numbers or special characters',
    ),
  email: yup
    .string()
    .required('Please enter your email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    )
    .max(100, 'Email exceeds limit'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters including one uppercase letter, one special character, and alphanumeric characters',
    ),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one cause')
    .required('Please select at least one cause'),
  pinCode: yup
    .string()
    .required('Please enter your pincode')
    .matches(
      /^[1-9][0-9]{5}$/,
      'Pincode must be 6 digits and cannot start with 0',
    ),
  address: yup
    .string()
    .required('Please enter your address')
    .min(10, 'Address must be at least 10 characters')
    .max(250, 'Address too long'),
});

export const mobileOtpValidation = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must not exceed 10 digits'),
});

export const AccountValidation = yup.object().shape({
  accountHolderName: yup.string().required('Required'),
  accountNumber: yup
    .string()
    .matches(/^[0-9]{9,18}$/, 'Invalid account number')
    .required('Required'),
  bankName: yup.string().required('Required'),
  ifscCode: yup
    .string()
    .matches(/^[A-Za-z]{4}[0-9]{7}$/, 'Invalid IFSC code')
    .required('Required'),
});

export const addAccountValidation = yup.object().shape({
  accountHolderName: yup.string().required('Account holder name is required'),
  bankName: yup.string().required('Required'),
  accountNumber: yup
    .string()
    .required('Account number is required')
    .matches(/^[0-9]{9,18}$/, 'Invalid account number'),
  confirmAccountNumber: yup
    .string()
    .required('Confirm Account number is required')
    .oneOf([yup.ref('accountNumber'), null], 'Account number must match')
    .matches(/^[0-9]{9,18}$/, 'Invalid account number'),

  ifscCode: yup
    .string()
    .required('Ifsc code is required')
    .matches(/^[A-Za-z]{4}[A-Za-z0-9]{7}$/, 'Invalid IFSC code'),
});

export const loginValidation = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must not exceed 10 digits'),
  password: yup.string().required('Please enter password.'),
});

export const addharCardValidation = yup.object().shape({
  aadhaarNumber: yup
    .string()
    .required('Aadhaar number is required')
    .matches(/^[2-9]{1}[0-9]{11}$/, 'Enter a valid 12-digit Aadhaar number'),
});

export const panCardValidation = yup.object().shape({
  panNumber: yup
    .string()
    .required('PAN number is required')
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      'Enter a valid PAN number (e.g., ABCDE1234F)',
    ),
});

export const contactFormValidation = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});

export const forgotPasswordValidation = yup.object().shape({
  // mobile: yup.string().required('Mobile number is required'),
  // code: yup.string().required('Please enter otp.'),
  newPassword: yup.string().required('Please enter new password.'),
});

export const resetPassword = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must not exceed 10 digits'),
  code: yup.string().required('Please enter otp.'),
  newPassword: yup.string().required('Please enter new password.'),
});

export const kycValidation = yup.object().shape({
  aadharNumber: yup
    .string()
    .required('Aadhar number is required')
    .matches(
      /^\d{12}$/,
      'Aadhar number must be exactly 12 digits long and contain only numbers',
    ),
  mobileNumber: yup
    .string()
    .matches(/^\+91/, 'Mobile number must start with +91')
    .matches(
      /^\+91\d{10}$/,
      'Mobile number must have exactly 10 digits after +91',
    )
    .required('Mobile number is required'),
  // captcha: yup.string().required("Please Enter Captcha")
  // otp: yup.string().required('Please Enter OTP'),
});

export const otpValidation = yup.object().shape({
  otp: yup.string().required('Please Enter otp'),
});

export const mobileVerificationValidation = yup.object().shape({
  mobile_verification_code: yup
    .string()
    .required('Please Enter Mobile Verification Code'),
});
