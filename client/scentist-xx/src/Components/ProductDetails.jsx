import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CardMedia,
  IconButton,
  Badge,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PAYPAL_CLIENT_ID = 'AV4qW331MdI6Fu_lvtLlBfXmYP0Ug1IlVsCz7-BU72eyPUBlru3qMzhpqAUMP4N2eBD_umCqogTCp61f';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const perfume = location.state?.perfume;
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('cartCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [animateItems, setAnimateItems] = useState([]);
  const paypalRef = useRef();

  useEffect(() => {
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  useEffect(() => {
    if (!perfume) return;

    const existingScript = document.getElementById('paypal-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => renderPaypalButtons();
      document.body.appendChild(script);
    } else {
      if (window.paypal) {
        renderPaypalButtons();
      } else {
        existingScript.addEventListener('load', renderPaypalButtons);
      }
    }
  }, [perfume]);

  const renderPaypalButtons = () => {
    if (!window.paypal || !perfume || !paypalRef.current) return;

    // Clear any existing buttons
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
            description: perfume.name,
            amount: {
              currency_code: 'USD',
              value: (perfume.price / 82).toFixed(2),
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        alert(`Payment Successful! Transaction ID: ${order.id}`);
        // Optionally post to backend
      },
      onError: (err) => {
        console.error('PayPal Error:', err);
        alert('Payment failed. Please try again.');
      },
    }).render(paypalRef.current);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add to cart');
      return;
    }

    if (!perfume || !perfume.id) {
      alert('Invalid product data.');
      return;
    }

    const product = {
      productId: perfume.id,
      name: perfume.name,
      price: perfume.price,
      image: perfume.image,
    };

    try {
      setIsAnimating(true);
      setAnimateItems(prev => [...prev, { id: Date.now() }]);

      const res = await axios.post(
        'https://scentist-xx.onrender.com/api/cart/add',
        { product },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Cart Added:', res.data);

      setTimeout(() => {
        setCartCount(prev => prev + 1);
        setIsAnimating(false);
      }, 1000);
    } catch (err) {
      console.error('Add to cart error:', err.response?.data || err.message);
      setIsAnimating(false);
    }
  };

  if (!perfume) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6">Product details not available.</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 8, maxWidth: 'lg', position: 'relative' }}>
      <IconButton
        onClick={() => navigate('/cart')}
        sx={{ position: 'absolute', top: -40, right: -120, backgroundColor: '#f5f5f5' }}
      >
        <Badge badgeContent={cartCount} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
       sx={{
  mt: 2,
        ml: -15,
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
        ← Back to Collection
      </Button>

      <AnimatePresence>
        {animateItems.map(item => (
          <motion.div
            key={item.id}
            initial={{
              position: 'fixed',
              width: 20,
              height: 20,
              backgroundColor: '#1976d2',
              borderRadius: '50%',
              zIndex: 9999,
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            animate={{
              x: window.innerWidth - 100,
              y: -100,
              scale: 0.5,
              opacity: 0,
            }}
            transition={{ duration: 1 }}
            onAnimationComplete={() =>
              setAnimateItems(prev => prev.filter(i => i.id !== item.id))
            }
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </AnimatePresence>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <motion.div
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          <CardMedia
            component="img"
            image={perfume.image}
            alt={perfume.name}
            sx={{
              width: '100%',
              height: { xs: 300, md: 400 },
              objectFit: 'contain',
              borderRadius: 2,
              mt: 27,
            }}
          />
        </motion.div>

        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 3, sm: 4 },
            backgroundColor: '#ffffff',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            mt: 2,
            ml:9  
          }}
        >
         <Typography variant="h3" fontWeight={700} gutterBottom>
  {perfume.name}
</Typography>

<Typography 
  variant="h5" 
  color="text.secondary" 
  gutterBottom 
  sx={{ fontWeight: 800, fontSize: '1.8rem', color: '#333' }}
>
  ₹{perfume.price}
</Typography>

  <Typography variant="body1" sx={{ mb: 3 }}>
    {perfume.brand}
  </Typography>
  <Typography variant="body1" sx={{ mb: 3 }}>
    {perfume.description}
  </Typography>

<Typography 
  variant="body1" 
  sx={{ 
    mb: 3, 
    lineHeight: 1.8, 
    fontSize: '1.1rem', 
    color: '#444' 
  }} 
  dangerouslySetInnerHTML={{ __html: perfume.Highlights }} 
/>



          <Button
  variant="contained"
  color="secondary"
  fullWidth
  sx={{ 
    fontWeight: 'bold', 
    py: 1.5,           // padding top and bottom
    px: 17,             // padding left and right
    fontSize: '1rem'   // optional: improve text readability
  }}
  onClick={handleAddToCart}
  disabled={isAnimating}
>

            {isAnimating ? 'Adding...' : 'Add to Cart'}
          </Button>

          <Box ref={paypalRef} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;
