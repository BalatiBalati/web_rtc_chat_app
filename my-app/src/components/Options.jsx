import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, Snackbar } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from '../SocketContext'; // Import context

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCopy, setIdToCopy] = useState('');
    const [idToCall, setIdToCall] = useState('');
    const [callError, setCallError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCall = () => {
        if (idToCall) {
            alert(`Calling ${idToCall}`);
            callUser(idToCall);  // Trigger callUser function with the ID
            alert("It worked");
        } else {
            alert("Please enter a valid ID to call");
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        {/* Account Info Section */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Account Info
                            </Typography>
                        </Grid>

                        {/* Copy ID Section */}
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Name" 
                                variant="outlined" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}  // Set name in state
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CopyToClipboard text={me}>
                                <Button fullWidth variant="contained" color="primary" startIcon={<Assignment />}>
                                    Copy My ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>

                        {/* Call Section */}
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6">Make a call</Typography>
                            <TextField 
                                fullWidth 
                                label="ID to call" 
                                variant="outlined" 
                                value={idToCall} 
                                onChange={(e) => setIdToCall(e.target.value)}  // Set ID to call in state
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {callAccepted && !callEnded ? (
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="secondary" 
                                    startIcon={<PhoneDisabled />} 
                                    onClick={leaveCall}  // Trigger leaveCall function to hang up
                                    sx={{ margin: '10px 0' }}
                                >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<Phone />} 
                                    onClick={handleCall}  // Trigger call on button click
                                    sx={{ margin: '10px 0' }}
                                >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>

                    {children}
                </form>
            </Paper>

            {/* Snackbar for error messages */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)} 
                message={callError} 
            />
        </Container>
    );
};

export default Options;
