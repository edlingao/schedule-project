import template from './activities.template.html'
import events from './activities.events.js'
import EdsComponent from 'edscomponent'

import REQUEST from '../../REQUEST.js'
import routes from '../../routes.js'

export default class Activities extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
        this.activities = []
        this.allActivities = []
    }

    static get tagName(){
        return 'all-activities'
    }

    static get observedAttributes() {
        return ['data-day']
    }
    attributeChangedCallback(name, oldValue, newValue) {
      REQUEST.GET(routes.getAllTasks).then(data => {
        this.allActivities = data
        this.activities = this.allActivities.find(({weekday}) => weekday == newValue).activities
        this.completeRender()
      })
    }
    completeRender() {
        this.insertAttributes()
        this.render()
        this.insertEvents()
    }
    connectedCallback(){
    }

    insertAttributes(){
        const args = {
            ...this.dataset,
            activities: this.activities != null
                ? this.activities
                : []
            }
        this.template = this.insertVariables({htmlString: template, args})
    }

    insertEvents() {
    }

}