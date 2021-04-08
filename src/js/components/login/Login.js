import EdsComponet from 'edscomponent'
import Template from './login.template.html'
import events from './login.events.js'

export default class Login extends EdsComponet{

    constructor(){
        super('', Template)
        this.insertEvents()
    }

    static get tagName(){
        return 'ce-form'
    }

    static get observedAttributes(){
        return ['data-register']
    }

    attributeChangedCallback(name, oldV, newV) {
        if(oldV == null ) return
        this.insertAttributes()
        this.render()
        this.insertEvents()
    }

    insertAttributes(){
        const args = {register: JSON.parse(this.dataset.register)}
        this.template = this.insertVariables({htmlString: Template, args})
    }

    changeForm(){
        this.dataset.register = !JSON.parse(this.dataset.register)
    }

    insertEvents(){
        const register = JSON.parse(this.dataset.register)
        const { loginEvents, registerEvents } = events
        this.querySelector('.button').addEventListener('click', e =>{
            e.preventDefault()
            !register ? 
                loginEvents(this) : 
                registerEvents(this)
        })

        this.querySelector('.login-label').addEventListener('click', () => this.changeForm())
    }
} 