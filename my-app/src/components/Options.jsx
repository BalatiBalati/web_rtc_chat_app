import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'; // ✅ FIXED IMPORT

import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCopy, setIdToCopy] = useState('');
    const [idToCall, setIdToCall] = useState(''); // ✅ FIXED: Defined state

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: 3, 
                    borderRadius: 2, 
                    width: '100%', 
                    maxWidth: '400px', 
                    textAlign: 'center' 
                }}
            >
                <form noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Video Call Options
                            </Typography>
                        </Grid>

                        {/* Copy ID Section */}
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Enter ID to Copy" 
                                variant="outlined" 
                                value={idToCopy} 
                                onChange={(e) => setIdToCopy(e.target.value)}
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
                                onChange={(e) => setIdToCall(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {callAccepted && !callEnded ? (
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="secondary" 
                                    startIcon={<PhoneDisabled />} 
                                    onClick={leaveCall}
                                >
                                    Hang Up
                                </Button>
                            ) : (
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<Phone />} 
                                    onClick={() => callUser(idToCall)}
                                >
                                    Call
                                </Button>
                            )}
                        </Grid>
                    </Grid>

                    {children}
                </form>
            </Paper>
        </Container>
    );
};

export default Options;
