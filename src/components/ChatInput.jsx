import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import  dayjs  from 'dayjs';
import LoadingSpinnerGif from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        if(isLoading || inputText === '') {
            return;
        }
        setIsLoading(true);

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]

        setChatMessages(newChatMessages);

        setChatMessages([
            ...newChatMessages,
            {
                message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);

        setInputText('');

        setIsLoading(false);
    }

    function handleKeyDown(event) {
        if(event.key === 'Enter') {
            sendMessage();
            setInputText('');
        }
        else if(event.key === 'Delete') {
            setInputText('');
        }
    }

    function clearMessages() {
        localStorage.removeItem('messages');
        setChatMessages([]);
    }

    return(
        <div className="chat-input-container">
            <input 
                placeholder="Send a message to Chatbot" 
                size="30" 
                onChange={saveInputText} 
                value={inputText}
                onKeyDown={handleKeyDown}
                className="input-text"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>
            <button
                onClick={clearMessages}
                className='clear-button'
            >Clear</button>
        </div>
    );
}