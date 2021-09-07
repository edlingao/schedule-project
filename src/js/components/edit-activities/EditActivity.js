import template from './editActivity.template.html'
import events from './editActivity.events.js'
import EdsComponent from 'edscomponent'

export default class EditActivity extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
    }

    static get tagName(){
        return 'edit-activity'
    }

    connectedCallback(){
    }

    insertEvents() {
    }

}