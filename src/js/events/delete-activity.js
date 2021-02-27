import routes from '../routes.js'
import Request from '../REQUEST.js'


export default function deleteActivity( ID, activityItem ){
    Request.DELETE( routes.deleteTask(ID) ).then( data => {
        if(data.ok == 1){
            activityItem.remove()
        }
    })
}