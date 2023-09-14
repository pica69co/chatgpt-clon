import { useEffect, useRef, useState } from 'react'
// import { sendMsgToOpenAI } from '../../api/openai'
import styles from '../views/Home.module.css' 
import chatLogo from '../assets/chatgptLogo.svg'
import addBtn from '../assets/add-30.png'
import msgIcon from '../assets/message.svg'
import home from '../assets/home.svg'
import saved from '../assets/bookmark.svg'
import rocket from '../assets/rocket.svg'
import sendBtn from '../assets/send.svg'

const Home = () => {
  const msgEnd = useRef(null)

  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChat, setPreviousChat] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
    const [error, setError] = useState(null)

  useEffect = ( () => {
    // console.log(currentTitle, value, message);
    !currentTitle && value && message && setCurrentTitle(value)
    if(currentTitle && value && message){
        setPreviousChat(previousChat => [...previousChat, 
            {
                title: currentTitle, 
                role: "user",
                content: value    
            },
            {
                title: currentTitle, 
                role: message.rol,
                content: message.content
            }
        ])
    }
    msgEnd.current.scrollIntoView()
  }, [message, currentTitle])
  
  const getMessages = async () => {
    //console.log('clicked');
    const options = {
        method: 'POST',
        body: JSON.stringify({
            message: value
        }),
        Headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const response = await fetch('http://localhost:8000/completions', options)
        const data = await response.json()
        //console.log(data);
        setMessage(data.choices[0].message);
        
    } catch (error) {
        console.log(error);
        setError(error);
    }
  }

  const createNewChat = () => {
    //console.log('clicked');
    setMessage(null)
    setValue("")
    setCurrentTitle(null)

  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const currentChat = previousChat.filter(previous => previous.title === currentTitle)
  
  const uniqueTitles = Array.from(new Set(previousChat.map(previous => previous.title)))
  const chat = 'Chat'
  const owner = 'Oscar Warrieta'
  // console.log('value: ', value);
  // console.log('message: ', message);
  // console.log('previpreviousChat: ',previousChat);

   return (
    <div className={styles.container}> 
    <section className={styles.sideBar}>
        <button
            onClick={createNewChat}
        ><span><img src={addBtn} alt='add logo' style={{width:'15px', paddingRight:'1rem'}}/></span>{' '}New chat</button>
        <ul className={styles.history}>
             {uniqueTitles?.map((uniqueTitle, index) => 
             <li 
                key={index}
                onClick={()=>handleClick(uniqueTitle)}
                ><img src={msgIcon} alt='msg-icon' style={{marginRight:'2rem', height:'1.7rem'}}/> {uniqueTitle}</li>)}
        </ul>
        <nav className={styles.nav}>
            <div className='lowerSide'>
                <div className='listItems'><img src={saved} alt='logo'className='iconImg'/> Saved</div>
                <div className='listItems'><img src={home} alt='home logo' className='iconImg'/> Home</div>
                <div className='listItems'><img src={rocket} alt='rocket' className='iconImg'/> Upgrade to Pro</div>
            </div>

            <p>Made by &copy;{owner}</p>
        </nav>
    </section>

    <section className={styles.main}>
        {!currentTitle && <h1><img src={chatLogo} alt='logo'/> {chat}GPT</h1>}
        <ul className={styles.feed}>
            {error && <p className={styles.error}>Upss, Something went wrong! Or no credits</p>}
            {currentChat.map((chatMessage, index) => <li key={index}>
                <p className={styles.rol}>{chatMessage.rol}</p>
                <p className={styles.content}>{chatMessage.content}</p>
            </li>)}
        </ul>
        <div ref={msgEnd}/>
        <div className={styles.btnSection}>
            <div className={styles.inputContainer}>
                <input 
                 value={value}
                 placeholder='Send a message'
                 onChange={e=>setValue(e.target.value)}
                />
                <div 
                    className={styles.submit}
                    onClick={getMessages}
                    ><img src={sendBtn} alt='send icon' />
                </div>
            </div>
            <p className={styles.info}>
                Free Research Preview. ChatGPT may produce innacurate information about people, places, or facts. 
                <a href='https://help.openai.com/en/articles/6825453-chatgpt-release-notes' rel='noopener noreferrer'> ChatGPT August 3 Version </a>
            </p>
        </div>
    </section>
    </div>
  )
}

export default Home