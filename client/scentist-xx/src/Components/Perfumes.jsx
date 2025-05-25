import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const themeColors = {
  Men: {
    background: 'linear-gradient(270deg,rgb(253, 195, 4), #1a1a1a)',
    card: 'linear-gradient(135deg,rgba(186, 145, 21, 0.8), #000000cc)',
    backgroundAnimation: {
      animation: 'gradientShift 12s ease infinite',
      backgroundSize: '400% 400%',
    },
    cardEffect: {
      boxShadow: '0 0 15px 3px rgba(212, 175, 55, 0.4)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 0 25px 5px rgba(255, 223, 0, 0.7)',
      },
    },
  },

 Women: {
  background: 'linear-gradient(270deg, #8a2be2, #ff69b4)',  // rich purple to bright pink
  card: 'linear-gradient(135deg, #a366f9cc, #ff7eb9cc)',    // subtle purple-pink translucent blend for card
  backgroundAnimation: {
    animation: 'gradientShift 12s ease infinite',
    backgroundSize: '400% 400%',
  },
  cardEffect: {
    boxShadow: '0 0 20px 5px rgba(138, 43, 226, 0.7), 0 0 15px 5px rgba(255, 105, 180, 0.6)', // purple + pink glow
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 40px 10px rgba(138, 43, 226, 1), 0 0 30px 8px rgba(255, 105, 180, 0.9)',
    },
  },
},


Unisex: {
  background: 'linear-gradient(270deg, #6A0DAD, #FFD700)', // purple to gold gradient
  backgroundAnimation: {
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
      pointerEvents: 'none',  // <-- Add this line
    },
    '@keyframes move': {
      '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
      '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
    },
  },
  card: 'linear-gradient(135deg, #bfa430cc, #6a0dadcc)', // translucent gold to purple card
  cardEffect: {
    boxShadow: '0 0 20px 5px rgba(212, 175, 55, 0.7), 0 0 15px 5px rgba(138, 43, 226, 0.6)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 40px 10px rgba(212, 175, 55, 1), 0 0 30px 8px rgba(138, 43, 226, 0.9)',
    },
  },
},




  Default: {
     background: 'linear-gradient(270deg, #6A0DAD, #FFD700)', // purple to gold gradient
  backgroundAnimation: {
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
  },
  card: 'linear-gradient(135deg, #bfa430cc, #6a0dadcc)', // translucent gold to purple card
  cardEffect: {
    boxShadow: '0 0 20px 5px rgba(212, 175, 55, 0.7), 0 0 15px 5px rgba(138, 43, 226, 0.6)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 40px 10px rgba(212, 175, 55, 1), 0 0 30px 8px rgba(138, 43, 226, 0.9)',
    },
  },
},
};


const Perfumes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategory = location.state?.selectedCategory || 'Default';

  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    background,
    card,
    backgroundAnimation,
    cardEffect,
  } = themeColors[selectedCategory] || themeColors.Default;

  useEffect(() => {
    axios.get('https://scentist-xx.onrender.com/perfumes')
      .then(response => {
        let perfumesData = response.data.perfumes || response.data;

        if (!Array.isArray(perfumesData)) {
          console.error("Expected an array, got:", perfumesData);
          perfumesData = [];
        }

        if (selectedCategory !== 'Default') {
          perfumesData = perfumesData.filter(
            perfume => perfume.gender?.toLowerCase() === selectedCategory.toLowerCase()
          );
        }

        setPerfumes(perfumesData);
      })
      .catch(error => {
        console.error("Error fetching perfumes: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Loading Perfumes...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%', 
      background, 
      py: 8, 
      px: 2, 
      ...backgroundAnimation 
    }}>
      <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                mt: 1,
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
      <Container>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4, color: '#fff' }}
        >
          {selectedCategory !== 'Default'
            ? `${selectedCategory} Perfume Collection`
            : 'Our Perfume Collection'}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 4,
          }}
        >
          {perfumes.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => navigate(`/product/${perfume.id}`, { state: { perfume } })}
                sx={{
                  height: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: card,
                  borderRadius: 3,
                  cursor: 'pointer',
                  ...cardEffect,
                }}
              >
                <CardMedia
                  component="img"
                  image={perfume.image}
                  alt={perfume.name}
                  sx={{
                    height: 260,
                    objectFit: 'contain',
                    backgroundColor: '#fff',
                    p: 1,
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#fff' }}>
                    {perfume.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#ddd' }}>
                    {perfume.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff', mt: 'auto' }}>
                    ₹{perfume.price}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Perfumes;
