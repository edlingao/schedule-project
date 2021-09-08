import template from './editActivity.template.html'
import events from './editActivity.events.js'
import EdsComponent from 'edscomponent'

import REQUEST from '../../REQUEST.js'
import routes from '../../routes.js'
export default class EditActivity extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
        this.activities = []
        this.allActivities = []
    }

    static get tagName(){
        return 'edit-activity'
    }

    static get observedAttributes() {
        return ['data-show', 'data-day']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'data-show':
                if(newValue == 'true') {
                    REQUEST.GET(routes.getAllTasks).then(data => {
                        this.allActivities = data
                        this.activities = this.allActivities.find(({weekday}) => weekday == 'sunday').activities
                        this.completeRender()
                    })
                }
                break
            case 'data-day':
                if(oldValue != null) {
                    REQUEST.GET(routes.getAllTasks).then(data => {
                        this.allActivities = data
                        this.activities = this.allActivities.find(({weekday}) => weekday == this.dataset.day).activities
                        this.completeRender()
                    })
                }
                break
        }
    }
    completeRender() {
        this.insertAttributes()
        this.render()
        this.insertEvents()
    }
    connectedCallback(){
    }

    insertAttributes(){
        const args = {...this.dataset, activities: this.activities != null ? this.activities : []}
        this.template = this.insertVariables({htmlString: template, args})
    }

    insertEvents() {
        const exitButton = this.querySelector('.exit')
        const {exit} = events
        exitButton.addEventListener('click', exit)
    }

}