import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const API = 'https://scentist-xx.onrender.com';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API}/register`, { name, email, password });
      setSuccess(true);
      localStorage.setItem('token', response.data.token);
      setTimeout(() => navigate('/home'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      className="register-container"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a0033 0%, #000000 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        position: 'relative',
      }}
    >
      {/* Logo top-left */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '8px 12px',
          boxShadow: '0 0 15px 3px rgba(179, 153, 255, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(179, 153, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1001,
        }}
      >
<img
  src={logo}
  alt="Scentist Logo"
  className="responsive-logo"
  style={{
    height: 100,
    animation: 'logoGlow 3s ease-in-out infinite',
    mixBlendMode: 'screen',
  }}
/>


      </Box>

      <Container maxWidth="sm">
        <Paper
          className="register-paper"
          elevation={10}
          sx={{
            padding: 6,
            borderRadius: 3,
            border: '2px solid',
            borderImageSlice: 1,
            borderWidth: '2px',
            borderImageSource: 'linear-gradient(270deg, #6a0dad, #b399ff, #6a0dad)',
            boxShadow: '0 0 15px 2px #b399ff',
            animation: 'glow 2s ease-in-out infinite alternate',
            backgroundColor: 'rgba(20, 0, 40, 0.85)',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#b399ff', fontWeight: 'bold' }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleRegister} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                input: { color: '#eee' },
                label: { color: '#b399ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6a0dad' },
                  '&:hover fieldset': { borderColor: '#b399ff' },
                  '&.Mui-focused fieldset': { borderColor: '#b399ff' },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                input: { color: '#eee' },
                label: { color: '#b399ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6a0dad' },
                  '&:hover fieldset': { borderColor: '#b399ff' },
                  '&.Mui-focused fieldset': { borderColor: '#b399ff' },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                input: { color: '#eee' },
                label: { color: '#b399ff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6a0dad' },
                  '&:hover fieldset': { borderColor: '#b399ff' },
                  '&.Mui-focused fieldset': { borderColor: '#b399ff' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background: 'linear-gradient(90deg, #b399ff, #6a0dad)',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { background: 'linear-gradient(90deg, #6a0dad, #b399ff)' },
              }}
              disabled={success}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            style={{
              position: 'fixed',
              top: 20,
              left: 0,
              right: 0,
              margin: '0 auto',
              width: 'fit-content',
              backgroundColor: '#6a0dad',
              color: '#fff',
              padding: '15px 25px',
              borderRadius: 8,
              boxShadow: '0 0 15px #b399ff',
              fontWeight: 'bold',
              zIndex: 1000,
              textAlign: 'center',
            }}
          >
            Registered successfully! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            style={{
              position: 'fixed',
              top: 20,
              right: 20,
              backgroundColor: '#b00020',
              color: '#fff',
              padding: '15px 25px',
              borderRadius: 8,
              boxShadow: '0 0 15px #ff4444',
              fontWeight: 'bold',
              zIndex: 1000,
              cursor: 'pointer',
            }}
            onClick={() => setError('')}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations and Media Query Styles */}
      <style>
        {`
        @keyframes logoGlow {
  0% {
    filter: drop-shadow(0 0 5pxrgb(123, 89, 223));
  }
  50% {
    filter: drop-shadow(0 0 15px #b399ff) drop-shadow(0 0 25px #6a0dad);
  }
  100% {
    filter: drop-shadow(0 0 5px #b399ff);
  }
}

          @keyframes glow {
            0% {
              box-shadow: 0 0 10px 2px #b399ff;
              border-image-source: linear-gradient(270deg, #6a0dad, #b399ff, #6a0dad);
            }
            100% {
              box-shadow: 0 0 25px 6px #b399ff;
              border-image-source: linear-gradient(270deg, #b399ff, #6a0dad, #b399ff);
            }
          }

          @media screen and (max-width: 480px) {
            .register-logo {
              height: 70px !important;
            }

            .register-paper {
              padding: 24px !important;
              width: 100% !important;
              margin: 0 8px;
            }

            .register-container {
              padding: 0 !important;
            }
          }
        `}
      </style>
    </Box>
  );
}
