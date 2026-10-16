import { useEffect, useState } from 'react';
import { ChatInput } from './components/ChatInput.jsx';
import ChatMessages from './components/ChatMessages'; //Default export
import { Chatbot } from 'supersimpledev';
import './App.css';

function App() {
    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
      
      //const [chatMessages, setChatMessages] = array;
      //const chatMessages = array[0];
      //const setChatMessages = array[1];

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages));
    }, [chatMessages]);

    useEffect(() => {
        Chatbot.addResponses({
            'followed routine': 'Congratulations! I am so proud of you. Show up tomorrow',
            'night': 'Sure, Have a lovely night!',
            'give me a unique id': function() {
                return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
            }
        });
    }, []);

      return(
          <div className="app-container">
              {chatMessages.length === 0 && 
                  <p className="chat-title">
                      Welcome to the ceechat! Send a message using the textbox below.
                  </p>
              }

              <ChatMessages 
                  chatMessages={chatMessages}
              />
              <ChatInput 
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
              />
          </div>
      );
  }

export default App
