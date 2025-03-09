import React, { useContext } from 'react';
import { Button } from '@mui/material'; // ✅ Fixed import to use MUI v5
import { SocketContext } from '../SocketContext';

const Notifications = () => { 
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <>
            {call?.isReceivedCall && !callAccepted && ( // ✅ Safe check for call and isReceivedCall
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{call.name} is calling:</h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )}
        </>
    );
}

export default Notifications;
