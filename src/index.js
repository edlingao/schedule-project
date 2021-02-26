import Activity from './js/components/activity.js'
import Day from './js/components/day.js'
import routes from './js/routes.js'
import moment from 'moment'
import Request from './js/REQUEST.js'
import Global from './js/global.js'

const main = async () => {
    customElements.define('ce-activity', Activity)
    customElements.define('ce-day', Day)
    window.moment = moment
    let nextDays = []
    const today = moment().day()
    const activitiesForTheNextDays = []
    const timesToIterate = [0,1,2,3]
    const mainContainer = document.querySelector('.main-container');

    timesToIterate.forEach( ( amountOfDays )=> {
        nextDays = [...nextDays, moment().day(today+amountOfDays).format('dddd').toLowerCase()]
    })

    nextDays.forEach( async day => {
        const activities = await Request.GET( routes.getTaskFromDay(day) )
        activitiesForTheNextDays.push({day, activities})
        const dayElement = Global.creareElement(`
        <ce-day 
            data-today="${moment().day(today).format('dddd') == day }"
            data-day="${ day }"
            data-activities=${JSON.stringify(activities)}
        ></day>`)
        mainContainer.appendChild(dayElement);
        console.log(activities);
    })


    // const data = await Request.POST(routes.postTasks, {action: 'new-activity', params: {
    //     title: 'Example',
    //     end_hour: '15:00',
    //     start_hour: '16:00',
    //     week_day: 'friday'
    // }});
    // console.log(data);


}

main();