import { useEffect, useRef, useState } from "react"
import './styles.css'
import { FaHeart } from "react-icons/fa6";

export default function Chat() {
    const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
    const color = {
        'Alan': 'darkgreen',
        'Bob': 'lightseagreen',
        'Carol': 'lightcoral',
        'Dean': 'blue',
        'Elin': 'brown'
    }
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const displayRef = useRef();
    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollTop = displayRef.current.scrollHeight;
        }
    }, [messages])

    function handleDisplayMessage() {
        let msg = inputValue;
        let randomUser = user_list[Math.floor(Math.random() * user_list.length)];
        let obj = {
            message: msg,
            likeCount: 0,
            user: randomUser,
            color: color[randomUser]
        }
        let temp = messages
        temp.push(obj)
        setMessages(temp);
        setInputValue('')
        console.log(displayRef.current.scrollTop, displayRef.current.scrollHeight);
        if (displayRef.current) {
            displayRef.current.scrollTop = displayRef.current.scrollHeight;
        }

    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (inputValue === '') return
            handleDisplayMessage();
        }
    }

    function handleLikeButton(index){
        let temp = messages;
        let t = temp.map((item, i) => {
            if(i === index){
                item.likeCount += 1;
                console.log('likes', item.likeCount);
            }
            return item
        })
        setMessages(t); 
    }

    return (
        <div className="chatbot-wrapper">
            <div className="chat-display">
                <div className="chat-heading">
                    <h3>Chat App</h3>
                </div>
                <div className="display-container" ref={displayRef}>
                    {
                        messages && messages.length ? messages.map((item, index) => <div key={index} className="message-container">
                            <span style={{backgroundColor: item.color}} className="user-initial">{item.user[0]}</span>
                            <p className="message-content">{item.message}</p>
                            <span onClick={() => handleLikeButton(index)} style={{color: 'red', cursor: 'pointer'}}><FaHeart /></span>&nbsp;<span>{item.likeCount}</span>
                        </div>
                        )
                        : null
                    }
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name="input"
                        placeholder="Type your message here..."
                        className="chat-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <button onClick={handleDisplayMessage}>Send</button>
                </div>
            </div>
            
        </div>
    )
}