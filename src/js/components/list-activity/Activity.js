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
        const { deleteActivity } = events
        const deleteButton = this.querySelector('.delete')
        const editButton = this.querySelector('.edit')
        
        deleteButton.addEventListener('click',() => {
            deleteActivity({
                ID: this.dataset.id,
                activityElement: this
            })
        })
        editButton.addEventListener('click', () => {
            console.log('clicked')
        })
    }

}