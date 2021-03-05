import Global from "../global.js"
import actions from '../actions.js'
import actionsObj from '../context-menu-actions/exportActions.js'

export default class ConextMenu extends HTMLElement{
    constructor(){
        super()
        this.classList.add('glass-container','context-menu','hide-item')
        this.paintOptions()
    }
    connectedCallback(){
        // console.log('Metido');
    }

    actionDefinitions( action ){
        const definitionObj = {}
        switch( action ){
            case 'dark':
                definitionObj['icon'] = 'dark_mode'
                definitionObj['label'] = 'Dark theme'
                definitionObj['iconColor'] = 'dark'
                break
            case 'light':
                definitionObj['icon'] = 'light_mode'
                definitionObj['label'] = 'Light theme'
                definitionObj['iconColor'] = 'warning'
                break
            case 'create': 
                definitionObj['icon'] = 'check_circle'
                definitionObj['label'] = 'Agregar actividad'
                definitionObj['iconColor'] = 'blue'
            break
            case 'logout':
                definitionObj['icon'] = 'logout'
                definitionObj['label'] = 'Cerrar sesion'
                definitionObj['iconColor'] = 'error'
            break
        }
        return definitionObj
    }
    paintOptions(){
        actions.forEach( action => {
            const {icon, label, iconColor} = this.actionDefinitions(action)
            const option = Global.createElement(`
                <div class="option">
                    <p class="label">${label}</p>
                    <i class="material-icons icon ${iconColor}">${icon}</i>
                </div>
            `)
            option.addEventListener('click', actionsObj[action])
            this.appendChild(option)
        })
    }

    

}