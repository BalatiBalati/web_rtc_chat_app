import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// Create Context
const SocketContext = createContext();

const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000');

export const SocketProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;
            })
            .catch((error) => {
                console.error('Error getting media:', error);
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });

        return () => {
            socket.off('me');
            socket.off('callUser');
        };
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) userVideo.current.srcObject = currentStream;
        });

        peer.on('error', (err) => {
            console.error('Peer connection error:', err);
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id) => {
        alert(`Calling user ${id}...`);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) userVideo.current.srcObject = currentStream;
        });

        peer.on('error', (err) => {
            console.error('Peer connection error:', err);
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current?.destroy();

        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext };
