import Global from '../global.js';
export default class Activity extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(this.paintActivity(this.dataset))
        this.shadow.prepend(Global.creareElement(`<link rel="stylesheet" href="/main.css">`))
    }
    connectedCallback(){
        
    }
    attributeChangedCallback(){

        console.log("Something has changed")
    }
    static get observedAttributes(){
        return[
            'data-icon', 
            'data-title'
        ]
    }

    paintActivity({title, icon, completed, start_hour, end_hour}){
        debugger;
        return Global.creareElement(
            `<div class="activity glass-container">
                <i class="material-icons icon ${ completed ? 'success' : 'warning'}">${icon}</i>
                <p class="title">${title}</p>
                <p class="hour"> De <b class="from">${start_hour}</b> a <b class="from">${end_hour}</b></p>
            </div>`
        )
    }
    
}