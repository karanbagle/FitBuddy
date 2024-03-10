import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './diagnosis.css';

function Diagnosis() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      speechRecognition.lang = language;
      speechRecognition.interimResults = false;
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        handleSubmit(transcript);
      };

      setRecognition(speechRecognition);
    }
  }, [language]);

  useEffect(() => {
    if (isSpeaking) {
      speak(response);
    } else {
      stopSpeaking();
    }
  }, [isSpeaking, response]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      stopSpeaking();
    };
  }, []);

  const handleWindowClose = () => {
    stopSpeaking();
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const handleSubmit = async (submittedText) => {
    try {
      const apiResponse = await axios.post(
        "/api/chat/completions",
        {
          model: "pplx-7b-online",
          messages: [{ role: "user", content: submittedText }],
        },
        {
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(apiResponse.data.choices[0].message.content);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while sending your message.');
      setIsSpeaking(false);
    }
  };

  const speak = (textToSpeak) => {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  return (
    <div className='Diagnosis'>
      <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-selector">
        <option value="en-US">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="es-ES">Spanish</option>
      </select>
      <textarea
        className='text-area'
        placeholder='Describe your symptoms...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isListening}
      />
      <div className="actions">
        <button type='button' className='mic-button' onClick={startListening} disabled={isListening}>
          🎤
        </button>
        <button type='button' className='stop-button' onClick={stopSpeaking}>
          Stop
        </button>
        <button type='button' className='submit-button' onClick={() => handleSubmit(text)}>
          Submit
        </button>
      </div>
      {response && (
        <div className='response'>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Diagnosis;
