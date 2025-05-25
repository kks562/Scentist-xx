import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Typography, Card, CardMedia,
  Button, Box, Divider
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PAYPAL_CLIENT_ID = 'AV4qW331MdI6Fu_lvtLlBfXmYP0Ug1IlVsCz7-BU72eyPUBlru3qMzhpqAUMP4N2eBD_umCqogTCp61f';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState('');
  const [showPaypal, setShowPaypal] = useState(false);
  const paypalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const uid = decoded.userId;
      setUserId(uid);
      fetchCartItems(uid);
    }
  }, []);

  const fetchCartItems = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/cart/${id}`);
      setCartItems(res.data || []);
      localStorage.setItem('cartCount', (res.data || []).length.toString());
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedItems = cartItems.filter(item => item._id !== cartItemId);
      setCartItems(updatedItems);
      localStorage.setItem('cartCount', updatedItems.length.toString());
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  };

  useEffect(() => {
    if (!showPaypal || cartItems.length === 0) return;

    const existingScript = document.getElementById('paypal-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.id = 'paypal-sdk';
      script.onload = renderPaypalButtons;
      document.body.appendChild(script);
    } else {
      renderPaypalButtons();
    }
  }, [showPaypal]);

  const renderPaypalButtons = () => {
    if (!window.paypal || !paypalRef.current) return;

    paypalRef.current.innerHTML = '';
    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Cart Purchase',
            amount: {
              currency_code: 'USD',
              value: (getTotal() / 82).toFixed(2),
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        alert(`Payment Successful! Transaction ID: ${order.id}`);
      },
      onError: (err) => {
        console.error('PayPal Error:', err);
        alert('Payment failed. Please try again.');
      },
    }).render(paypalRef.current);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6A0DAD 0%, #FFD700 100%)',
        py: 6,
        px: 2,
      }}
    >
      <button
        onClick={goBack}
        style={{
          padding: '10px 20px',
          background: 'white',
          color: '#6A0DAD',
          border: '2px solid #6A0DAD',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        ← Go Back
      </button>

      <Container maxWidth="md" sx={{ backgroundColor: 'white', borderRadius: 3, p: 4, boxShadow: 5 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            background: 'linear-gradient(90deg, #6A0DAD, gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          Your Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary">Your cart is empty.</Typography>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: '#faf5ff',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 1 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{item.name}</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#6A0DAD' }}>₹{item.price}</Typography>
                  </Box>
                </Box>

                <Button
                  onClick={() => handleRemove(item._id)}
                  sx={{
                    background: 'linear-gradient(90deg, #ff4d4d, #ff1a1a)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    transition: '0.3s',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #e60000, #cc0000)',
                      boxShadow: '0 0 10px rgba(255, 26, 26, 0.6)',
                    },
                  }}
                >
                  Remove
                </Button>
              </Card>
            ))}

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: '#6A0DAD' }}>
                Total: ₹{getTotal()}
              </Typography>

              {!showPaypal ? (
                <Button
                  onClick={() => setShowPaypal(true)}
                  sx={{
                    background: 'linear-gradient(90deg, gold, #6A0DAD)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(90deg, goldenrod, #5a009d)',
                    },
                  }}
                >
                  Checkout
                </Button>
              ) : (
                <Box ref={paypalRef} sx={{ mt: 2 }} />
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
