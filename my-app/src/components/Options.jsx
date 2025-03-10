import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';

const Options = ({ children }) => {
    const { me, callUser, callAccepted, leaveCall } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    const handleCall = () => {
        if (idToCall.trim() === '') {
            alert("❌ Please enter a valid ID to call.");
            return;
        }
        console.log(`📞 Calling user with ID: ${idToCall}`);
        callUser(idToCall);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <p><strong>📌 Your ID:</strong> {me}</p>
            <button 
                onClick={() => navigator.clipboard.writeText(me)} 
                style={{ padding: "5px 10px", cursor: "pointer", background: "#008CBA", color: "white", border: "none", borderRadius: "5px" }}
            >
                Copy ID
            </button>

            <input
                type="text"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                placeholder="Enter ID to call"
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray", width: "250px" }}
            />

            {callAccepted ? (
                <button 
                    onClick={leaveCall} 
                    style={{ padding: "8px 12px", background: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Hang Up
                </button>
            ) : (
                <button 
                    onClick={handleCall} 
                    style={{ padding: "8px 12px", background: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Call
                </button>
            )}

            {children}
        </div>
    );
};

export default Options;
