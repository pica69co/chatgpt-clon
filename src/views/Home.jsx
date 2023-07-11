import React, { useEffect, useState } from 'react'
import styles from '../views/Home.module.css' 
const Home = () => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect = () => {
  
  }
  const getMessages = async () => {
    console.log('clicked');
    const options = {
        method: 'POST',
        body: JSON.stringify({
            message: 'Hello how are you?'
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
    }
  }
  
   return (
    <div className={styles.container}> 
    <section className={styles.sideBar}>
        <button><span>+</span>{' '}New chat</button>
        <div className={styles.history}>


        </div>
        <nav className={styles.nav}><p>Made by &copy;pica</p></nav>
    </section>
    <section className={styles.main}>
        <h1>picaGPT</h1>
        <p id='' className={styles.output}></p>
        <div className={styles.btnSection}>
            <div className={styles.inputContainer}>
                <input 
                 value={value}
                 
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