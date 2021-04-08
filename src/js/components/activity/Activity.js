import template  from './activity.template.html'
import EdsComponet from 'edscomponent'
import events from './activity.events.js'

export default class Activity extends EdsComponet{
    constructor(){
        super('', template)
        this.events()
        events.changeCompleted({activityElement: this, isCompleted: events.isCompleted})
    }

    insertAttributes(){
        const args = {...this.dataset, complete: this.dataset.complete == 'true' }
        this.template = this.insertVariables({htmlString: template, args})
    }


    events() {
        const {deleteActivity, setIntervalEvent, changeCompleted, isCompleted} = events

        const activity = this.querySelector('.activity')
        const deleteButton = activity.querySelector('.delete-button')
        
        this.dataset.interval = setIntervalEvent({activityElement: this, changeCompleted, isCompleted})
        
        deleteButton.addEventListener('click', () => {
            deleteActivity({ID: this.dataset.id, activityElement: this})
            clearInterval(this.countingInterval)
        })
    }

    attributeChangedCallback(){
        this.insertAttributes()
        this.render()
        this.events()
        this.querySelector('.title').innerText = this.dataset.title
    }
    
    
    static get observedAttributes(){
        return[
            'data-complete'
        ]
    }
}