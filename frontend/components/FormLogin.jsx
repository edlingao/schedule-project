import React, { useState } from 'react'
export default function Home() {

  const [register, setRegister] = useState(false)

  return (
    <form className={`glass-container form ${!register ? 'login' : 'register'}`}>
        <header className="header">
            <div className="logo">
                <img height="100" width="80" src="./img/logo.svg" alt="MySchedule logo" />
            </div>
            <div className="title">
                <h1 className="main-title">My schedule</h1>
                <p className="author">by <a href="https://github.com/edlingao" target="_blank" className="highlight">Edlingao</a></p>
            </div>
        </header>
        <div className="body">
            <label>
                {
                    !register ? '' :
                    <input name="name" className="glass-input" type="text" placeholder="Username" />
                }
                <input name="email" className="glass-input" type="email" placeholder="E-mail..." />
                <input name="password" className="glass-input" type="password" placeholder="Password..." />
            </label>
        </div>
        <footer className="footer">
            <button className="button save-button">{ !register ? 'Login' : 'Registrar'}</button>
            <p className="register-text">
              {!register ? 'No tiene cuenta ' : 'Ya tiene cuenta?'}
              <b className="highlight login-label" onClick={() => setRegister(!register)}>
                { !register ? 'Registrese aqui ' : 'Ingrese aqui'}
              </b>
            </p>
        </footer>
    </form>
  )
}