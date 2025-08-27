import { CircularProgress, Modal } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';

const Spinner = () => {
  return (
    <Modal open={true}>
      <Box className="a-center border-0 ring-0 outline-0  rounded-2xl">
        <CircularProgress />
      </Box>
    </Modal>
  );
};

export default Spinner;
