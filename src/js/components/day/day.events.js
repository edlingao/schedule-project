export default {
    scrollEvent: ({dayElement, listElement}) => {
        let scrollPixels = 0

        dayElement.addEventListener('wheel', (e) => {
            e.preventDefault()
            dayElement = document.querySelector(`ce-day[data-day="${dayElement.dataset.day}"]`)
            if(e.deltaY < 0 && scrollPixels <= 0){
                listElement.scrollTo(listElement.scrollLeft - 250, 0)
            }else if(e.deltaY > 0 ){
                listElement.scrollTo(listElement.scrollLeft + 250, 0)
            }
        })
    }
}