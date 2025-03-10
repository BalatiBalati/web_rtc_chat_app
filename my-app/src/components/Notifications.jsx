import React, { useContext } from 'react';
import { Button, CircularProgress, Box } from '@mui/material';
import { SocketContext } from '../SocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted, rejectCall, callInProgress } = useContext(SocketContext);

    return (
        <>
            {call.isReceivingCall && !callAccepted && (
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    bgcolor="rgba(0, 0, 0, 0.7)" 
                    color="white" 
                    padding="20px" 
                    borderRadius="10px"
                >
                    <h1>{call.name} is calling...</h1>
                    <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                        <Button variant="contained" color="primary" onClick={answerCall} disabled={callInProgress}>
                            {callInProgress ? <CircularProgress size={24} color="inherit" /> : 'Answer'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={rejectCall}>
                            Reject
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Notifications;
