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
        const body = this.querySelector('.weekday')
        body.addEventListener('click', () => {
            const modal = document.querySelector('edit-activity')
            const selectedItem = document.querySelector('.week-days').querySelector('.selected')
            selectedItem != null 
                ? selectedItem.classList.remove('selected')
                : null
            body.classList.add('selected')
            modal.dataset.day = this.dataset.value
        })
    }

}