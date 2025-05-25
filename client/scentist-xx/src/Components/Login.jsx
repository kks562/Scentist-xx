import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { keyframes } from '@mui/system';

const API = 'http://localhost:3001';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  const glowAnimation = keyframes`
  0% {
    filter: drop-shadow(0 0 7px #f5e04c);
  }
  100% {
    filter: drop-shadow(0 0 20px #f5e04c);
  }
`;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #3a2e0a 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 2,
      }}
    >
      {/* Responsive Logo */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(169, 163, 16, 0.1)',
          borderRadius: '12px',
          padding: '8px 12px',
          boxShadow: '0 0 15px 3px rgba(197, 229, 15, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(172, 208, 30, 0.3)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1001,
        }}
      >
      <img
  src={logo}
  alt="Scentist Logo"
  style={{
    height: 180,
    maxHeight: '100px',
    maxWidth: '190px',
    filter: 'drop-shadow(0 0 5px #b399ff)',
    mixBlendMode: 'screen',
    transition: 'all 0.3s ease',
    animation: 'glow 2s ease-in-out infinite alternate',
  }}
/>

      </Box>

      {/* Login Form */}
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 6,
            borderRadius: 3,
            border: '2px solid',
            borderImageSlice: 1,
            borderWidth: '2px',
            borderImageSource: 'linear-gradient(270deg, #d4af37, #f5e04c, #d4af37)',
            boxShadow: '0 0 15px 2px #f5e04c',
            animation: 'glow 2s ease-in-out infinite alternate',
            backgroundColor: 'rgba(30, 20, 0, 0.85)',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#d4af37', fontWeight: 'bold' }}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                input: { color: '#f5e04c' },
                label: { color: '#d4af37' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d4af37' },
                  '&:hover fieldset': { borderColor: '#f5e04c' },
                  '&.Mui-focused fieldset': { borderColor: '#f5e04c' },
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
                input: { color: '#f5e04c' },
                label: { color: '#d4af37' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#d4af37' },
                  '&:hover fieldset': { borderColor: '#f5e04c' },
                  '&.Mui-focused fieldset': { borderColor: '#f5e04c' },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background: 'linear-gradient(90deg, #d4af37, #f5e04c)',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': { background: 'linear-gradient(90deg, #f5e04c, #d4af37)' },
              }}
            >
              Login
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2, color: '#d4af37' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#f5e04c',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Container>

      {/* Animated Error Message */}
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

      {/* Glow Keyframes */}
      <style>
        {`
          @keyframes glow {
            0% {
              box-shadow: 0 0 10px 2px #f5e04c;
              border-image-source: linear-gradient(270deg, #d4af37, #f5e04c, #d4af37);
            }
            100% {
              box-shadow: 0 0 25px 6px #f5e04c;
              border-image-source: linear-gradient(270deg, #f5e04c, #d4af37, #f5e04c);
            }
          }
        `}
      </style>
    </Box>
  );
}
