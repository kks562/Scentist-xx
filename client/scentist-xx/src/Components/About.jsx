import React from 'react';
import { Box, Typography, Avatar, Stack, Link, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import profile from '../assets/new.JPG';
import gfg from '../assets/gfg.png';
import linkedin from '../assets/linked.png';
import leetcode from '../assets/leet.png';

const About = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: 2,
        py: 8,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom right, #6A0DAD, #FFD700)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
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
          position: 'absolute',
          top: 10,
          left: 10,
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
          zIndex: 2,
        }}
      >
        Back to Home
      </Button>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 6,
        }}
      >
        <Avatar
          src={profile}
          sx={{ width: 140, height: 140, mb: 3, border: '3px solid white' }}
        />

        <Typography variant="h4" fontWeight="bold" mb={2}>
          Kavin Krishna S
        </Typography>

        <Typography variant="body1" maxWidth={600} mb={2}>
          I'm a web developer passionate about building clean and interactive websites with modern technologies.
        </Typography>

        <Typography variant="body1" maxWidth={600} mb={2}>
          <strong>Education:</strong> B.E. in Electronics and Communication Engineering at Srikrishna College of Technology.
        </Typography>

        <Typography variant="body1" maxWidth={600} mb={2}>
          <strong>Skills:</strong> HTML, CSS, JavaScript, React, MERN STACK.
        </Typography>

        <Stack direction="row" spacing={5} mt={4}>
          {/* LinkedIn */}
          <Box textAlign="center">
            <Link
              href="https://www.linkedin.com/in/kavin-krishna-s-3a078b2a2/"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box
                component="img"
                src={linkedin}
                alt="LinkedIn"
                sx={{ width: 40, height: 40 }}
              />
              <Typography mt={1} fontSize={14} color="white">
                LinkedIn
              </Typography>
            </Link>
          </Box>

          {/* LeetCode */}
          <Box textAlign="center">
            <Link
              href="https://leetcode.com/u/kavinkrishnas/"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box
                component="img"
                src={leetcode}
                alt="LeetCode"
                sx={{ width: 40, height: 40 }}
              />
              <Typography mt={1} fontSize={14} color="white">
                LeetCode
              </Typography>
            </Link>
          </Box>

          {/* GeeksforGeeks */}
          <Box textAlign="center">
            <Link
              href="https://www.geeksforgeeks.org/user/kavinkrishna562/"
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Box
                component="img"
                src={gfg}
                alt="GeeksforGeeks"
                sx={{ width: 40, height: 40 }}
              />
              <Typography mt={1} fontSize={14} color="white">
                GeeksforGeeks
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default About;
