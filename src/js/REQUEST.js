export default class Request {

    static async GET( url ){
        const response = await fetch(url)
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
        }

        const response = await fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObj)
        })
        const data = await response.json()

        return data
    }

    static async DELETE(url, { action }){

        const response = await fetch(url, {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()

        return data
    }

}