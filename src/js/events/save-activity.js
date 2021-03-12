import routes from '../routes.js'
import Request from '../REQUEST.js'
import Global from '../global.js'
import toastr from 'toastr'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default function saveActivity(){
    const form = document.querySelector('.create-activity')
    const title = form.querySelector('.title').value
    const dayOfTheWeek = form.querySelector('#day-select').value
    const startHour = form.querySelector('#from').value
    const endHour = form.querySelector('#to').value

    Request.POST(routes.postTasks, {action: 'new-activity', params: {
        title,
        end_hour: endHour,
        start_hour: startHour,
        week_day: dayOfTheWeek
    }}).then( data => {
        if(data.status == false){
            toastr.error(data.message)
            return
        }
        form.querySelector('.title').value = ''
        form.querySelector('#from').value = '12:00'
        form.querySelector('#to').value = '14:00'
        form.classList.add('hide-item')
        
        const {title, icon, start_hour, end_hour, _id, week_day} = data
        const day = document.querySelector(`ce-day[data-day="${week_day}"]`)
        if( day != null ){
            const today = moment().format('dddd').toLowerCase() == week_day
            const format = 'HH:mm'
            const newActivity = Global.createElement(`
                <ce-activity 
                    data-title="${title}"
                    data-icon="${icon}"
                    data-start_hour="${start_hour}"
                    data-end_hour="${end_hour}"
                    data-complete="${false}"
                    data-today="${today}"
                    data-id="${_id}"
                >
                </ce-activity>`
            )
            const allElementActivities = [...day.shadow.querySelectorAll('ce-activity')]
            allElementActivities.reverse().forEach( activityElement => {

                const fisrtStartHour = moment(start_hour,format)
                const firstEndHour = moment(end_hour, format)
                const secondStartHour = moment(activityElement.dataset.start_hour, format)
                const secondEndHour = moment(activityElement.dataset.end_hour, format)
                //activity < nextActivity
                if(
                    fisrtStartHour.isSameOrBefore(secondStartHour) 
                    &&
                    firstEndHour.isSameOrBefore(secondEndHour)
                ){
                  activityElement.parentElement.insertBefore(newActivity, activityElement)  
                }
                return

            })
            if(allElementActivities.length <=0 ){
                day.shadow.querySelector('.activities').appendChild(newActivity)
                return
            }
            day.shadow.querySelector('.activities').appendChild(newActivity)

            
        }
    }).catch( err => {
        toastr.error(err.message)
    })
}