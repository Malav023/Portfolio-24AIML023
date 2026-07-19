import React, { useState } from 'react';

export default function Contact() {
  // Hook 1: State for form input management
  const [message, setMessage] = useState('');
  
  // Hook 2: State for toggling UI visibility
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Drop a Note</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="msg-input" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Message:
        </label>
        <textarea
          id="msg-input"
          value={message}
          onChange={handleTextChange}
          placeholder="Type your message here..."
          style={{ width: '100%', minHeight: '100px', padding: '10px', borderRadius: '4px' }}
        />
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
          Character Count: <strong>{message.length}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        <button 
          onClick={() => setIsPreviewVisible(!isPreviewVisible)}
          style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {isPreviewVisible ? 'Hide Preview' : 'Show Live Preview'}
        </button>
      </div>

      {/* Conditional Rendering utilizing UI visibility toggling state */}
      {isPreviewVisible && (
        <div style={{ padding: '15px', border: '1px dashed #61dafb', borderRadius: '4px', background: 'rgba(97,218,251,0.05)' }}>
          <h5>Live Preview:</h5>
          <p style={{ fontStyle: 'italic', wordBreak: 'break-word' }}>
            {message || "(Empty text field. Start typing above to mirror input in real-time.)"}
          </p>
        </div>
      )}
    </div>
  );
}