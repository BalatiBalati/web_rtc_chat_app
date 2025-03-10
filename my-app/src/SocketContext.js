import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

// Create Context
const SocketContext = createContext();

// Ensure you use the correct backend server URL
const socket = io('http://localhost:5000');

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

    // 🚀 Ensure video stream starts properly
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;
                console.log("🎥 Local video stream set");
            })
            .catch((error) => console.error("Error accessing media devices:", error));

        socket.on('me', (id) => {
            console.log(`🟢 Connected, My ID: ${id}`);
            setMe(id);
        });

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            console.log(`📲 Incoming call from ${callerName} (${from})`);
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        console.log("📞 Answering call...");
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log("📡 Sending answer signal...");
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            console.log("📽️ Receiving remote video stream...");
            if (userVideo.current) userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = (id) => {
        console.log(`📞 Calling user ${id}...`);

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log("📡 Emitting callUser event to server...");
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            console.log("📽️ Setting remote user stream...");
            if (userVideo.current) userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            console.log("✅ Call accepted, signaling peer...");
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        console.log("❌ Leaving call...");
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
