// components/Loading.tsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../store/slices/loadingSlice';

const Loading: React.FC = () => {
  const isLoading = useSelector(selectLoading);

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}>
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loading;
