import Global from '../global.js'
import moment from 'moment'
import deleteActivity from '../events/delete-activity.js'

export default class Activity extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.prepend(Global.createElement(`<link rel="stylesheet" href="/main.css">`))
        this.countingInterval = null
    }
    events() {
        const activity = this.shadow.querySelector('.activity')
        const deleteButton = activity.querySelector('.delete-button')
        
        if(this.dataset.today == 'true' && this.dataset.complete == 'false' && this.countingInterval == null){
            this.countingInterval = setInterval( () => {
                if(this.isCompleted(this.dataset.start_hour, this.dataset.end_hour)){
                    clearInterval(this.countingInterval)
                    Global.showNotifications(`Se completo ${this.dataset.title}`)
                    this.changeCompleted()
                }
            }, 1000)
        }

        deleteButton.addEventListener('click', () => {
            deleteActivity(this.dataset.id, this)
            clearInterval(this.countingInterval)
        })
    }
    connectedCallback(){
        this.shadow.querySelector('.activity') != null ? 
        this.shadow.querySelector('.activity') .remove() 
        : null
        this.shadow.appendChild(this.paintActivity(this.dataset))
        this.changeCompleted()
        this.events()
    }

    changeCompleted(){
        if(this.isCompleted(this.dataset.start_hour, this.dataset.end_hour)){
            this.dataset.icon = 'check_circle'
            this.dataset.complete = true
            return true
        }else{
            this.dataset.icon = 'alarm'
            this.dataset.complete = false
            return false
        }
    }

    attributeChangedCallback(){
        this.shadow.querySelector('.activity') != null ? 
            this.shadow.querySelector('.activity') .remove() 
            : null
        this.shadow.appendChild(this.paintActivity(this.dataset))
        this.events()
    }
    
    isCompleted(start, end){
        const format = 'HH:mm'
        const startHour = moment(start, format)
        const endHour = moment(end, format)
        const currentHour = moment()
        return this.dataset.today == 'true' && !currentHour.isBetween(startHour , endHour ) && currentHour.isAfter(moment(start, format))
    }
    

    paintActivity({title, icon, complete, start_hour, end_hour}){
        complete = complete == 'true'
        return Global.createElement(
        `<div class="activity glass-container">
            <i class="material-icons icon error delete-button">delete_forever</i>
            <i class="material-icons icon ${ complete ? 'success' : 'warning'}">${icon}</i>
            <p class="title">${title}</p>
            <p class="hour"> De <b class="from">${start_hour}</b> a <b class="from">${end_hour}</b></p>
        </div>`
        )
    }
    
    static get observedAttributes(){
        return[
            'data-icon', 
            'data-complete'
        ]
    }
}