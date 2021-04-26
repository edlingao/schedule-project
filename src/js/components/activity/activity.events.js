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

    calculatePercentageEvent: ({activityElement}) => {
        const { start_hour, end_hour } = activityElement.dataset
        const format = 'HH:mm'

        const init = moment(start_hour, format)
        const end = moment(end_hour, format)
        const current = moment()
        const total = end._d.getTime() - init._d.getTime()
        const offset = current._d.getTime() - init._d.getTime()
        const percent = ( offset / total )

        return ( 
            percent <= 0 ? 
                0 :
                percent >= 1 ? 
                    100 :
                    Math.round((parseFloat( percent ).toFixed(2)) * 100 ) 
        ) 
    },

    setIntervalEvent: ({ activityElement, changeCompleted, isCompleted, calculatePercentageEvent }) => {
        const {today, complete, start_hour, end_hour, title } = activityElement.dataset
        let intervalID = activityElement.dataset.interval
        if(today == 'true'){
            const percentage = calculatePercentageEvent({activityElement})
            if(percentage > 0){
                activityElement.dataset.percentage = percentage
            }
        }
        if( today == 'true' && complete == 'false' && (activityElement.dataset.interval == null || activityElement.dataset.interval == 'undefined')){
            let showOnce = false
            intervalID = setInterval( () => {
                
                const percentage = calculatePercentageEvent({activityElement})
                if(percentage > 0){
                    activityElement.dataset.percentage = percentage
                    if(!showOnce){
                        showOnce = true
                        Global.showNotifications(`Esta en curso ${ title }`)
                    }
                }

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