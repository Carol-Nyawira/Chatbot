import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import './ChatMessage.css';
import { ChatInput } from './ChatInput';
import dayjs from 'dayjs';

export function ChatMessage({message, sender,time}) {
    //const message = props.message;
    //const sender = props.sender;
    //const {message, sender} = props; //Destructuring

    return(
        <div className={
            sender === 'user' 
                ? "user-message" 
                : "robot-message"
        }>
            {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-profile" />
            )}
            <div className="message-text">
                {message}
                {time && (
                    <div className='chat-time'>
                        {dayjs(time).format('h:mma')}
                    </div>
                )}
            </div>
            {sender === 'user' && (
                <img src={UserProfileImage} className="chat-profile" />
            )}
        </div>
    );
}
console.log(UserProfileImage);