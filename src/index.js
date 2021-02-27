import ContextMenu from './js/components/contextMenu'
import Activity from './js/components/activity.js'
import Day from './js/components/day.js'
import routes from './js/routes.js'
import Moment from 'moment'
import Request from './js/REQUEST.js'
import Global from './js/global.js'
import customSelect from 'custom-select'
import flatPicker from 'flatpickr'
import toastr from 'toastr'
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
Notification.requestPermission().then( result => {
})
const windowEvents = () => {
    document.addEventListener('contextmenu', e => {
        e.preventDefault()
        const newContextMenu = document.querySelector('.context-menu')
        const mousePosition = Global.getPosition(e)
        newContextMenu.classList.remove('hide-item')
        newContextMenu.style.top = `${mousePosition.y}px`
        newContextMenu.style.left = `${mousePosition.x}px`
        return false
    }, false)
    document.addEventListener('click', e => {
        const newContextMenu = document.querySelector('.context-menu')
        newContextMenu.classList.add('hide-item')
    }, false)
    document.addEventListener('keyup', e => {
        if(e.key == 'Escape'){
            const newContextMenu = document.querySelector('.context-menu')
            newContextMenu.classList.add('hide-item')
        }
    }, false)
}
const main = async () => {
    
    window.moment = moment
    const today = moment().day()
    const day = moment().format('dddd').toLowerCase()
    const mainContainer = document.querySelector('.main-container')
    

    const activities = await Request.GET( routes.getTaskFromDay(day) )
    activities.forEach( ({day, activities}) =>{
        const dayElement = Global.createElement(`
        <ce-day 
            data-today="${moment().day(today).format('dddd') == day }"
            data-day="${ day }"
            data-activities='${JSON.stringify(activities)}'
            ></day>`)
            mainContainer.appendChild(dayElement)
    } )

    Global.setEvents()    
    windowEvents()
}

main();
const flatPickerOptions = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true
}

customSelect(document.querySelector('#day-select'))
flatPicker('#from', flatPickerOptions)
flatPicker('#to', flatPickerOptions)

customElements.define('ce-activity', Activity)
customElements.define('ce-day', Day)
customElements.define('context-menu', ContextMenu)

window.toastr = toastr
window.toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }