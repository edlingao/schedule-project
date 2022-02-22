import template from './editActivity.template.html'
import events from './editActivity.events.js'
import EdsComponent from 'edscomponent'
export default class EditActivity extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
        this.activities = []
        this.allActivities = []
        this.selectedDay = 'sunday'
        this.weekdays = []
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
                this.selectedDay = 'sunday'
                // this.completeRender()
                break
            case 'data-day':
                this.selectedDay = newValue
                this.querySelector('all-activities').dataset.day = this.selectedDay
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
        const { checkDayStatus } = events
        this.weekdays = checkDayStatus(this.newWeekdays())
        const args = {
            ...this.dataset,
            selectedDay: this.selectedDay,
            weekdays: this.weekdays,
        }
        this.template = this.insertVariables({htmlString: template, args})
    }

    insertEvents() {
        const exitButton = this.querySelector('.exit')
        const { exit } = events
        exitButton.addEventListener('click', exit)
    }
    newWeekdays() {
        return [
            this.weekdayObj('Domingo', 'sunday'),
            this.weekdayObj('Lunes', 'monday'),
            this.weekdayObj('Martes', 'tuesday'),
            this.weekdayObj('Miercoles', 'wednesday'),
            this.weekdayObj('Jueves', 'thursday'),
            this.weekdayObj('Viernes', 'friday'),
            this.weekdayObj('Sabado', 'saturday'),
        ]
    }
    weekdayObj(name, value) {
        return {
            name,
            value,
        }
    }
}