import template  from './activity.template.html'
import EdsComponet from 'edscomponent'
import events from './activity.events.js'
import Global from '../../global.js'
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

    static get tagName(){
        return 'ce-activity'
    }

    events() {
        const {deleteActivity, setIntervalEvent, changeCompleted, isCompleted, calculatePercentageEvent} = events

        const activity = this.querySelector('.activity')
        const deleteButton = activity.querySelector('.delete-button')
        
        this.dataset.interval = setIntervalEvent({activityElement: this, changeCompleted, isCompleted, calculatePercentageEvent })
        
        deleteButton.addEventListener('click', () => {
            deleteActivity({ID: this.dataset.id, activityElement: this})
            clearInterval(this.countingInterval)
        })
    }

    attributeChangedCallback(name,oldVal, newVal){

        switch( name ){
            case 'data-percentage':
                this.querySelector('.percent').style.width = `${newVal}%`
            break
            case 'data-complete':
                this.insertAttributes()
                this.render()
                this.events()
                this.querySelector('.title').innerText = this.dataset.title
            break

        }
        
    }
    
    
    static get observedAttributes(){
        return[
            'data-complete',
            'data-percentage'
        ]
    }
}