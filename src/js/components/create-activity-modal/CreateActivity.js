import template from './createActivity.template.html'
import events from './createActivity.events.js'
import EdsComponent from 'edscomponent'
import { default as custom } from 'custom-select'
const { default: customSelect } = custom
import flatPicker from 'flatpickr'


export default class ConextMenu extends EdsComponent{
    constructor(){
        super('', template)
        this.insertEvents()
    }

    static get tagName(){
        return 'create-activity'
    }

    connectedCallback(){
        const flatPickerOptions = {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true
        }
        customSelect(this.querySelector('#day-select'))

        flatPicker('#from', flatPickerOptions)
        flatPicker('#to', flatPickerOptions)
    }

    insertEvents() {
        const { saveActivityEvent } = events
        const saveActivityButton = this.querySelector('.save-button')

        saveActivityButton.addEventListener('click', (e) => {
            e.preventDefault()
            saveActivityEvent()
        })
    }

}