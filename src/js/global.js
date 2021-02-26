export default class Global{
    static creareElement(html){
        const div = document.createElement('div')
        div.innerHTML = html
        return div.firstElementChild
    }
}