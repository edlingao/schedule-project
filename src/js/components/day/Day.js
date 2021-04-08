import Global from "../../global.js"
import moment from 'moment'
import EdsComponent from 'edscomponent'
import styles from './day.style.scss'
import template from './day.template.html'
import events from './day.events.js'

export default class Day extends EdsComponent {
    constructor(){
        super(styles, template)
        const {activities, today} = this.dataset
        this.insertActivities({activities: JSON.parse(activities), today})
        this.insertEvents()
    }

    static get tagName() {
        return 'ce-day'
    }
    insertAttributes(){
        const today = moment().format('dddd').toLowerCase() == this.dataset.day
        const args = {...this.dataset, moment, today, activities: JSON.parse(this.dataset.activities)}
        this.template = this.insertVariables({htmlString: this.template, args})
    }

    insertEvents() {
        const {scrollEvent} = events
        scrollEvent({dayElement: this ,listElement: this.querySelector('.activities')})
    }

    insertActivities({activities, today}){
        today = moment().format('dddd').toLowerCase() == this.dataset.day

        activities.length > 0 ?
            activities.forEach( ({title, icon, completed, start_hour, end_hour,_id }) => {
                this.querySelector(`.activities`).appendChild(Global.createElement(`
                    <ce-activity 
                        data-title="${title}"
                        data-icon="${icon}"
                        data-start_hour="${start_hour}"
                        data-end_hour="${end_hour}"
                        data-complete="${completed}"
                        data-today="${today}"
                        data-id="${_id}"
                    >
                    </ce-activity>`)
                )
            }) : false
    }
}