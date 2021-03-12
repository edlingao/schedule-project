import Global from "../global"
import Request from '../REQUEST'
import routes from "../routes"

export default class Login extends HTMLElement {
    constructor(){
        super()
        this.appendChild(this.paintForm(JSON.parse(this.dataset.register)))

    }

    static get observedAttributes(){
        return['data-register']
    }
    connectedCallback(){
    }

    attributeChangedCallback(){
        this.innerHTML = ''
        this.appendChild(this.paintForm(JSON.parse(this.dataset.register)))
    }

    registerEvents(){
        const email = this.querySelector('input[name="email"]').value
        const password = this.querySelector('input[name="password"]').value
        const name = this.querySelector('input[name="name"]').value
        Request.POST(routes.register, {action: 'register', params: { email, password, name} } ).then( data => {
            if(data.message != null ){
                throw data.message
            }
            if(data.user != null ){
                this.changeForm()
                toastr.success(`Registro del usuario ${name} existoso, puede iniciar sesion`)
            }
        }).catch( err => {
            toastr.error(err.message)
        })
    }
    loginEvents(){
        const email = this.querySelector('input[name="email"]').value
        const password = this.querySelector('input[name="password"]').value
        Request.POST(routes.login, {action: 'login', params: { email, password} } ).then( data => {
            if(data.message != null ){
                throw data.message
            }

            if(data.token != null ){
                localStorage.setItem('token', data.token)
                window.location.reload()
            }
        }).catch( err => {
            toastr.error(err.message)
        })
    }
    postButton() {
        if(this.register()){
            this.registerEvents()
        }else{
            this.loginEvents()
        }
    }
    changeForm(){
        this.dataset.register = !JSON.parse(this.dataset.register)
    }
    paintForm( register ){
        const loginElement = Global.createElement(`
                <form action="" class="glass-container form ${!register ? 'login' : 'register'}">
                    <header class="header">
                        <div class="logo">
                            <img height="100" width="80" src="./img/logo.svg" alt="MySchedule logo">
                        </div>
                        <div class="title">
                            <h1 class="main-title">My schedule</h1>
                            <p class="author">by <a href="https://github.com/edlingao" target="_blank" class="highlight">Edlingao</a></p>
                        </div>
                    </header>
                    <div class="body">
                        <label>
                            ${
                                !register ? '' :
                                '<input name="name" class="glass-input" type="text" placeholder="Username">'
                            }
                            <input name="email" class="glass-input" type="email" placeholder="E-mail...">
                            <input name="password" class="glass-input" type="password" placeholder="Password...">
                        </label>
                    </div>
                    <footer class="footer">
                        <button class="button save-button">${ !register ? 'Login' : 'Registrar'}</button>
                        <p class="register-text"> ${!register ? 
                            'Sin cuenta? <b class="highlight login-label">Registrese aqui</b>':
                            'Ya tiene cuenta? <b class="highlight login-label">Ingrese aqui</b>'}
                        </p>
                    </footer>
                </form>
            `)
        loginElement.querySelector('.button').addEventListener('click', e =>{
            e.preventDefault()
            !register ? 
                this.loginEvents() : 
                this.registerEvents()
        })
        loginElement.querySelector('.login-label').addEventListener('click', () => this.changeForm())

        return loginElement
    }
}