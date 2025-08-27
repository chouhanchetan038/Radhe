import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { reactIcons } from '../../../utils/icons';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const JoinUsType = ({ open, setOpen }) => {
  const navigate = useNavigate();
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
              }}
              className="flex h-6 w-[24px] items-center justify-center rounded-full border border-[#008000] bg-white text-black"
            >
              {reactIcons.close}
            </button>
          </div>
          <div className="flex flex-col justify-center py-3 items-center">
            <h3 className="font-medium text-14 lg:text-20 text-black  text-center mb-4">
              Please Select Register Type
            </h3>
            <div className=" mt-3  gap-2 flex">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/signup/donator');
                }}
                className="bg-green-600 hover:bg-green-700 border border-green-600 text-white text-sm px-5 py-2 rounded-full"
              >
                Donate Now
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/signup/volunteer');
                }}
                className="bg-white  border border-green-600 hover:text-green-700 text-green-600 text-sm px-5 py-2 rounded-full"
              >
                Volunteer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

JoinUsType.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.number.isRequired,
};

export default JoinUsType;
