import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    setIsLoading(true); // Show loader while waiting for response
    try {
      const res = await axios.post('http://localhost:8000/chat', { message });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Error occurred. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="p-2 border border-gray-300 rounded w-80 mb-4"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Send
      </button>
      {isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <p className="mt-4">{response}</p>
      )}
    </div>
  );
};

export default Chat;
