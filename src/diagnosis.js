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
                handleSubmit(transcript, true); // True indicates this is from voice recognition
            };
            setRecognition(speechRecognition);
        }
    }, [language]);

    useEffect(() => {
        if (isSpeaking) {
            speak(response);
        }
    }, [isSpeaking, response]); // This effect triggers speaking when needed

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

    const handleSubmit = async (submittedText, fromVoice = false) => {
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
            if (fromVoice) {
                setIsSpeaking(true);
            } else {
                setIsSpeaking(false); // Do not speak if the input was through typing
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse('An error occurred while sending your message.');
            setIsSpeaking(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post('http://127.0.0.1:5000/summarize', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setText(`(Summary: ${response.data.summary})`);
            } catch (error) {
                console.error('Error:', error);
                setText('An error occurred while summarizing the document.');
            }
        }
    };

    const speak = (textToSpeak) => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = language;
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
    };

    return (
        <div className='Diagnosis'>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-selector">
                <option value="en-US">English</option>
                <option value="hi-IN">Hindi</option>
                <option value="es-ES">Spanish</option>
            </select>
            <input type="file" onChange={handleFileUpload} />
            <textarea
                className='text-area'
                placeholder='Describe your symptoms or paste the medical history summary here...'
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
