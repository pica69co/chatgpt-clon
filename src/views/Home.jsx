import React from 'react'
import styles from '../views/Home.module.css' 
const Home = () => {
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
                <input/>
                <div className={styles.submit}>➢</div>
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