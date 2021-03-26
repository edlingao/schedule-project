import Global from "../global.js"
import moment from 'moment'

export default class Day extends HTMLElement {
    constructor(){
        super()
        const {day, activities, today} = this.dataset
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(this.paintDay({day, activities: JSON.parse(activities), today: JSON.parse(today) }))
        this.shadow.prepend(Global.createElement(`<link rel="stylesheet" href="/main.css">`))
        this.shadow.prepend(Global.createElement(`<style>        

            .empty-message{
                font-size: 2.25rem;
                color: white;
                min-height: 9.75rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 1rem;
            }
            .activities:not(:empty) ~.empty-message{
                display: none;
            }
        </style>`))
    }
    connectedCallback(){
    }

    attributeChangedCallback(){
    }

    static get observedAttributes(){
        return[]
    }

    paintDay({day, activities, today}){
        today = moment().format('dddd').toLowerCase() == day
        const dayElement = Global.createElement(`
            <section class="day">
                <header class="header">
                    <p class="title"> ${ today ? 'Actividades de hoy' : 'Actividades de '} <b class="date">${moment().day(day).locale('es').format('dddd DD MMMM')}</b></p>
                </header>
                <div class="activities"></div>
                <div class="empty-message">
                    <p>Oh, parece que no hay nada aqui, puedes descansar.</p>
                </div>
            </section>`)
        activities.length > 0 ?
            activities.forEach( ({title, icon, completed, start_hour, end_hour,_id }) => {
                dayElement.querySelector(`.activities`).appendChild(Global.createElement(`
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
            // dayElement.querySelector(`.activities`).appendChild(Global.createElement('<h1>No hay actividades para este dia</h1>'))

        return dayElement
    }
}