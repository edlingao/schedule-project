import template from './activity.template.html'
import events from './activity.events.js'
import EdsComponent from 'edscomponent'


export default class ConextMenu extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
    }

    static get tagName(){
        return 'list-activity'
    }

    connectedCallback(){
    }

    insertEvents() {
    }

}