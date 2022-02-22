import template from './activity.template.html'
import events from './activity.events.js'
import EdsComponent from 'edscomponent'


export default class ConextMenu extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
    }
    
    static get observedAttributes(){
        return[
            'data-complete',
            // 'data-percentage'
        ]
    }

    static get tagName(){
        return 'list-activity'
    }

    connectedCallback(){
    }

    attributeChangedCallback(name,oldVal, newVal){

        switch( name ){
            case 'data-percentage':
                this.querySelector('.percent').style.width = `${newVal}%`
            break
            case 'data-complete':
                this.insertAttributes()
                this.render()
                this.insertEvents()
            break

        }
        
    }


    insertAttributes(){
        const args = {
            ...this.dataset,
            complete: this.dataset.complete == 'true'
        }
        this.template = this.insertVariables({htmlString: template, args})
    }

    insertEvents() {
        const { deleteActivity, setIntervalEvent, changeCompleted, isCompleted, calculatePercentageEvent } = events
        const deleteButton = this.querySelector('.delete')
        const editButton = this.querySelector('.edit')
        this.dataset.interval = setIntervalEvent({
            activityElement: this,
            changeCompleted,
            isCompleted,
            calculatePercentageEvent
        })
        
        deleteButton.addEventListener('click',() => {
            deleteActivity({
                ID: this.dataset.id,
                activityElement: this
            })
            clearInterval(this.countingInterval)
        })
        editButton.addEventListener('click', () => {
            console.log('clicked')
        })
    }

}