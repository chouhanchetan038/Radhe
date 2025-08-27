import { Dialog, DialogContent } from '@mui/material';
import React, { useEffect } from 'react';
import { reactIcons } from '../../../utils/icons';
import OtpInput from 'react-otp-input';
import { formatTime } from '../../../utils/constants';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
const OtpVerificationModal = ({
  form,
  setForm,
  handleSentMobileOtp,
  open,
  setOpen,
  formError,
  setFormError,
  timer,
  setTimer,
  setMobileOtpSent,
}) => {
  useEffect(() => {
    if (timer <= 0) return;
    const newTimer = setInterval(() => {
      setTimer((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(newTimer);
  }, [timer, setTimer]);

  const handleOtpSubmit = () => {
    if (form?.verificationCode && form.verificationCode.length === 6) {
      toast.dismiss();
      toast.success('Otp submitted successfully');
      setMobileOtpSent(false);
      setTimer(0);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } else {
      setFormError({ verificationCode: 'Please enter otp' });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 9999,
          '& .MuiDialog-root': {
            zIndex: 9999,
          },
          '& .MuiBackdrop-root': {
            zIndex: 9998,
          },
          '& .MuiPaper-root': {
            background: '#f0fdf4',
            // 'linear-gradient(292deg, #008000 0%, #000000 75%, #000000 100%)',
            border: '1px solid #008000',
            zIndex: 10000,
          },
        }}
      >
        <DialogContent dividers={true}>
          <div className="flex justify-between">
            <div className="text-xl font-bold text-white"></div>
            <button
              onClick={() => {
                setOpen(false);
                setTimer(0);
              }}
              className="flex h-6 w-[24px] items-center justify-center rounded-full border border-[#008000] bg-white text-black"
            >
              {reactIcons.close}
            </button>
          </div>
          <div className="max-w-sm mt-4 mx-auto mb-8">
            <h1 className="font-medium text-20 lg:text-24 text-black  text-center mb-2">
              Enter One Time Password
            </h1>
            <p className="text-12 lg:text-16 text-black text-center mb-8">
              We have sent you a 6 digit OTP on your Mobile Number +91
              {form?.mobile.slice(0, 3)}
              *****
              {form?.mobile.slice(-3)}
            </p>
          </div>
          <div>
            <OtpInput
              value={form?.verificationCode}
              onChange={(otp) => {
                setForm((prev) => ({ ...prev, verificationCode: otp }));
                setFormError((prev) => ({
                  ...prev,
                  verificationCode: '',
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
                  formError.verificationCode ? '#C31515' : 'black'
                } `,
                background: 'transparent',
                boxShadow: formError.verificationCode
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
                  className="text-black"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              )}
            />
            {formError.verificationCode && (
              <div className="form-eror">{formError?.verificationCode}</div>
            )}
          </div>
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
          <div className="flex justify-center mt-3 mb-0 lg:mb-0">
            <button
              type="button"
              onClick={handleOtpSubmit}
              className="text-black py-2 px-4 bg-white rounded-md font-semibold border border-[#008000] text-12 md:text-14"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

OtpVerificationModal.propTypes = {
  form: PropTypes.shape({
    mobile: PropTypes.string,
    verificationCode: PropTypes.string,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
  handleSentMobileOtp: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  formError: PropTypes.shape({
    verificationCode: PropTypes.string,
  }).isRequired,
  setFormError: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  setMobileOtpSent: PropTypes.func.isRequired,
};

export default OtpVerificationModal;
