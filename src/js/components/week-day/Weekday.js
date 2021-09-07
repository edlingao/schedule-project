import template from './weekday.template.html'
import events from './weekday.events.js'
import EdsComponent from 'edscomponent'

export default class ConextMenu extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
    }

    static get tagName(){
        return 'week-day'
    }

    connectedCallback(){
    }

    insertEvents() {
    }

}