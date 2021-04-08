import moment from 'moment'
import routes from '../../routes.js'
import Request from '../../REQUEST.js'
import Global from '../../global.js'
/**
 * All imports must be at the begining of this file
 * key: "Element name"
 * value: "Function"
 */

export default {
    setIntervalEvent: ({ activityElement, changeCompleted, isCompleted }) => {
        const {today, complete, start_hour, end_hour, title } = activityElement.dataset
        let intervalID = activityElement.dataset.interval

        if( today == 'true' && complete == 'false' && (activityElement.dataset.interval == null || activityElement.dataset.interval == 'undefined')){
            intervalID = setInterval( () => {
            
                if( isCompleted( {start: start_hour, end: end_hour, activityElement} )){
                    // console.log({activityElement, interval: activityElement.dataset.interval})
                    clearInterval(parseInt(activityElement.dataset.interval))
                    Global.showNotifications(`Se completo ${ title }`)
                    changeCompleted({activityElement, isCompleted})
                }

            }, 1000)
        }
        return intervalID
    },

    changeCompleted: ({activityElement, isCompleted})=>{
        const {start_hour, end_hour } = activityElement.dataset

        if(isCompleted({activityElement, start: start_hour, end: end_hour})){
            activityElement.dataset.icon = 'check_circle'
            activityElement.dataset.complete = true
            return true
        }else{
            activityElement.dataset.icon = 'alarm'
            activityElement.dataset.complete = false
            return false
        }
        
    },

    isCompleted: ({activityElement, start, end}) => {
        const format = 'HH:mm'
        const startHour = moment(start, format)
        const endHour = moment(end, format)
        const currentHour = moment()
        return activityElement.dataset.today == 'true' && !currentHour.isBetween(startHour , endHour ) && currentHour.isAfter(moment(start, format))
    },

    deleteActivity: ( {ID, activityElement} ) => {
        
        Request.DELETE( routes.deleteTask(ID) ).then( data => {
            if(data.ok == 1){
                activityElement.remove()
            }
        })
    }
}