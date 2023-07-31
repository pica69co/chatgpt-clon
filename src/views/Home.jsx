import React, { useEffect, useState } from 'react'
import styles from '../views/Home.module.css' 
const Home = () => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChat, setPreviousChat] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)
    const [error, setError] = useState(null)

  useEffect = ( () => {
    console.log(currentTitle, value, message);
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
  }, [message, currentTitle])
  const getMessages = async () => {
    console.log('clicked');
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
        console.log(data);
        setMessage(data.choices[0].message);
        
    } catch (error) {
        console.log(error);
        setError(error);
    }
  }

  const createNewChat = () => {
    console.log('clicked');
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
  const owner = '{6|9}'
  console.log('value: ', value);
  console.log('message: ', message);
  console.log('previpreviousChat: ',previousChat);

   return (
    <div className={styles.container}> 
    <section className={styles.sideBar}>
        <button
            onClick={createNewChat}
        ><span>+</span>{' '}New chat</button>
        <ul className={styles.history}>
             {uniqueTitles?.map((uniqueTitle, index) => 
             <li 
                key={index}
                onClick={()=>handleClick(uniqueTitle)}
                >{uniqueTitle}</li>)}
        </ul>
        <nav className={styles.nav}><p>Made by &copy;{owner}</p></nav>
    </section>

    <section className={styles.main}>
        {!currentTitle && <h1>{owner}GPT</h1>}
        <ul className={styles.feed}>
            {error && <p className={styles.error}>Upss, Something went wrong!...</p>}
            {currentChat.map((chatMessage, index) => <li key={index}>
                <p className={styles.rol}>{chatMessage.rol}</p>
                <p className={styles.content}>{chatMessage.content}</p>
            </li>)}
        </ul>
        
        <div className={styles.btnSection}>
            <div className={styles.inputContainer}>
                <input 
                 value={value}
                 onChange={e=>setValue(e.target.value)}
                />
                <div 
                    className={styles.submit}
                    onClick={getMessages}
                    >➢</div>
            </div>
            <p className={styles.info}>
                Chat GPT academic version. Free Research Preview. ChatGPT July 8 version 
            </p>
        </div>
    </section>
    </div>
  )
}

export default Home