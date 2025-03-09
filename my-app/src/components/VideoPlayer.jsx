import React, { useContext } from 'react';
import { Box, Paper } from '@mui/material';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const { myVideo, userVideo, callAccepted, callEnded, stream } = useContext(SocketContext);

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'row' }, // ✅ Responsive Layout
                gap: 2,
                alignItems: 'center',
            }}
        >
            {stream && (
                <Paper 
                    elevation={3} 
                    sx={{ 
                        padding: '10px', 
                        border: '2px solid black', 
                        margin: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <video 
                        playsInline 
                        muted 
                        ref={myVideo} 
                        autoPlay 
                        style={{ width: '100%', maxWidth: '550px', borderRadius: '10px' }} 
                    />
                </Paper>
            )}

            {callAccepted && !callEnded && (
                <Paper 
                    elevation={3} 
                    sx={{ 
                        padding: '10px', 
                        border: '2px solid black', 
                        margin: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <video 
                        playsInline 
                        ref={userVideo} 
                        autoPlay 
                        style={{ width: '100%', maxWidth: '550px', borderRadius: '10px' }} 
                    />
                </Paper>
            )}
        </Box>
    );
};

export default VideoPlayer;
