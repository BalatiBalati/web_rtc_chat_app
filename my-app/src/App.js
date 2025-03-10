import React from 'react';
import { Typography, AppBar, Box } from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';

const App = () => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 2,
            }}
        >
            <AppBar 
                position="sticky"  // Fixed position for sticky behavior
                color="inherit"
                sx={{
                    borderRadius: '15px',
                    margin: '30px 10px',  // Reduced margins for better responsiveness
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',  // Full width for AppBar to span across the container
                    maxWidth: '600px',  // Max width for larger screens
                    border: '2px solid black',
                }}
            >
                <Typography variant="h4" align="center" color="primary">
                    Video Chat
                </Typography>
            </AppBar>
            <VideoPlayer />
            <Options>
                <Notifications />
            </Options>
        </Box>
    );
};

export default App;
