import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    useEffect(() => {
        console.log("🎥 My Stream:", stream);
        console.log("👀 User Video Reference:", userVideo.current);
        if (callAccepted && userVideo.current) {
            userVideo.current.load();
        }
    }, [stream, callAccepted]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            {/* My Video */}
            {stream && (
                <div>
                    <p><strong>{name || "Me"}</strong></p>
                    <video
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        style={{ width: "300px", borderRadius: "10px", border: "2px solid black" }}
                    />
                </div>
            )}
            
            {/* User's Video */}
            {callAccepted && !callEnded && (
                <div>
                    <p><strong>{call.name || "Caller"}</strong></p>
                    <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        style={{ width: "300px", borderRadius: "10px", border: "2px solid black" }}
                    />
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
