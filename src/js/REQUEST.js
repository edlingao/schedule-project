export default class Request {

    static async GET( url ){
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const data = await response.json()
        return data
    }

    static async POST(url, { action, params }){
        const requestObj = {}
        switch( action ){
            case 'new-activity':
                requestObj.title = params.title
                requestObj.end_hour = params.end_hour
                requestObj.start_hour = params.start_hour
                requestObj.week_day = params.week_day
            break
            case 'login':
                requestObj.email = params.email
                requestObj.password = params.password
            break
            case 'register':
                requestObj.name = params.name
                requestObj.email = params.email
                requestObj.password = params.password
            break
        }
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(requestObj)
        })
        const data = await response.json()
        if(response.status != 200){
            throw data
        }
        return data
    }

    static async DELETE(url){

        const response = await fetch(url, {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const data = await response.json()

        return data
    }

}