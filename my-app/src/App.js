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
                position="static" 
                color="inherit"
                sx={{
                    borderRadius: '15px',
                    margin: '30px 100px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '90%', sm: '600px' }, // ✅ FIXED
                    border: '2px solid black',
                }}
            >
                <Typography variant="h2" align="center" color="primary">
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
