import template from './context.template.html'
import events from './context.events.js'
import EdsComponent from 'edscomponent'
import actions from './menu-actions.js'

export default class ConextMenu extends EdsComponent{
    constructor(){
        super('', template)
        this.classList.add('glass-container','context-menu','hide-item')
        this.insertEvents()
    }

    static get tagName(){
        return 'context-menu'
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
            case 'edit':
                definitionObj['icon'] = 'date_range'
                definitionObj['label'] = 'Editar Actividades'
                definitionObj['iconColor'] = 'dark'
            break;
        }
        return definitionObj
    }

    insertAttributes(){
        const args = {...this.dataset, actionDefinitions: this.actionDefinitions, actions}
        this.template = this.insertVariables({htmlString: template, args})
    }

    insertEvents() {
        const { optionEvents } = events
        optionEvents({context: this})
    }

}