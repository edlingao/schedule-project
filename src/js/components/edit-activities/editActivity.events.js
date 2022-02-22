import moment from 'moment'

export default {
  exit() {
    const edit = document.querySelector('edit-activity')
    edit.dataset.show = 'false'
  },
  checkDayStatus(weekdays) {
    const today = moment().subtract(1,'days').format('dddd').toLocaleLowerCase()
    let founded = false
    const tempReverseArr = weekdays.slice().reverse().map(day => {
      if(day.value == today) {
        founded = true
      }
      if(founded) {
        day.status = true
      }
      return day
    })
    return tempReverseArr.reverse()
  }
}