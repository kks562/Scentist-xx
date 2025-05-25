import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsSuccess(false);

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        'service_6y88lt5',      // Your actual service ID
        'template_5zvv4wv',     // Your actual template ID
        formData,
        'g_CRvtQ_1RRNZeyBy'     // Your public key
      );
      setStatus('Message sent successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #6A0DAD, #FFD700)',
        position: 'relative',
        px: 2,
        py: 8,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '300%',
          height: '300%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent)',
          animation: 'move 20s linear infinite',
          transformOrigin: '50% 50%',
          zIndex: 0,
        },
        '@keyframes move': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
      }}
    >
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mt: 2,
          ml: 2,
          px: 3,
          py: 1,
          fontWeight: 'bold',
          color: 'white',
          background: 'linear-gradient(90deg, #6A0DAD, gold)',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #5a009d, goldenrod)',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
          },
          position: 'relative',
          zIndex: 2,
        }}
      >
        Back to Home
      </Button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            mx: 'auto',
            p: 4,
            borderRadius: 3,
            boxShadow: 10,
            backgroundColor: 'rgba(255,255,255,0.95)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(90deg, #6A0DAD, gold)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            Contact Us
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              background: 'linear-gradient(90deg, #6A0DAD, gold)',
              fontWeight: 'bold',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                background: 'linear-gradient(90deg, #5a009d, goldenrod)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
          </Button>

          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontWeight: 'bold',
                    color: isSuccess ? 'green' : 'red',
                    textAlign: 'center',
                  }}
                >
                  {status}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ContactForm;
