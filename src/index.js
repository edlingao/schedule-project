// import ContextMenu from './js/components/contextMenu.js'
import defineComponents from './js/defineComponents.js'

import routes from './js/routes.js'
import Request from './js/REQUEST.js'
import Global from './js/global.js'

import Moment from 'moment'
import toastr from 'toastr'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
Notification.requestPermission()

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

const windowEvents = () => {
    if(localStorage.getItem('light') != null && localStorage.getItem('light') == 'true'){
        document.body.classList.add('light')
    }
    document.addEventListener('contextmenu', e => {
        e.preventDefault()
        if(navigator.maxTouchPoints <= 0){
            const newContextMenu = document.querySelector('.context-menu')
            const mousePosition = Global.getPosition(e)
            newContextMenu.classList.remove('hide-item')
            newContextMenu.style.top = `${mousePosition.y}px`
            newContextMenu.style.left = `${mousePosition.x}px`
            return false
        }
    }, false)
    document.addEventListener('click', e => {
        if(navigator.maxTouchPoints <= 0){
            const newContextMenu = document.querySelector('.context-menu')
            newContextMenu.classList.add('hide-item')
        }
    }, false)
    document.addEventListener('keyup', e => {
        if(e.key == 'Escape'){
            if(navigator.maxTouchPoints <= 0){
                const newContextMenu = document.querySelector('.context-menu')
                newContextMenu.classList.add('hide-item')
            }
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

if(localStorage.getItem('token') != null){
    main();
}else{
    document.body.appendChild( Global.createElement(`
    <ce-form
        data-register="false"
    ></ce-form>`))
}

if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    const installButton = document.querySelector('.install-button')
    installButton.classList.add('hide-item')
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    window.deferredPrompt = e
    const installButton = document.querySelector('.install-button')
    installButton.classList.remove('hide-item')
})

defineComponents()