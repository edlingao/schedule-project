import Global from "../global"
import moment from 'moment'

export default class Day extends HTMLElement {
    constructor(){
        super()
        const {day, activities, today} = this.dataset
        this.shadow = this.attachShadow({mode: 'open'})
        console.log('Aqui entro')
        this.shadow.appendChild(this.paintDay({day, activities: JSON.parse(activities), today: JSON.parse(today) }))
        this.shadow.prepend(Global.creareElement(`<link rel="stylesheet" href="/main.css">`))
        this.shadow.prepend(Global.creareElement(`<style>        
            .activities:empty{
                content: 'No hay actividades para este dia';
                min-height: 9.75rem;
            }
        </style>`))
    }
    connectedCallback(){
        console.log('day rendered');
    }

    attributeChangedCallback(){
        console.log('Something has changed');
    }

    static get observedAttributes(){
        return[]
    }

    paintDay({day, activities, today}){
        const dayElement = Global.creareElement(`
            <section class="day">
                <header class="header">
                    <p class="title"> ${ today ? 'Actividades de hoy' : 'Actividades de '} <b class="date">${moment().day(day).locale('es').format('dddd DD MMMM')}</b></p>
                </header>
                <div class="activities"></div>
            </section>`)
        activities.length > 0 ?
            activities.forEach( ({title, icon, completed, start_hour, end_hour }) => {
                dayElement.querySelector(`.activities`).appendChild(Global.creareElement(`
                    <ce-activity 
                        data-title="${title}"
                        data-icon="${icon}"
                        data-start_hour="${start_hour}"
                        data-end_hour="${end_hour}"
                        data-complete="${completed}"
                    >
                    </ce-activity>`)
                )
            }) : false
            // dayElement.querySelector(`.activities`).appendChild(Global.creareElement('<h1>No hay actividades para este dia</h1>'))

        return dayElement
    }
}