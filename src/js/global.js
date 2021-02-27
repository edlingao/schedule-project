import saveActivity from './events/save-activity.js';

export default class Global{

    static setEvents(){
      const exitButtons = document.querySelectorAll('.exit');
      const saveActivityButton = document.querySelector('.save-button');
      exitButtons.forEach( exit => {
        exit.addEventListener('click', () => {
          const createAvtivityForm = document.querySelector('.create-activity')
          createAvtivityForm.classList.add('hide-item')
        })
      })
      saveActivityButton.addEventListener('click', e => {
        e.preventDefault()
        saveActivity()
      })
    }

    static showNotifications(title){
      Notification.requestPermission().then( status => {
        if(status == 'granted'){
          const options = {
            body: title,
            icon: '/img/background.jpg'
        }
          new Notification(title, options);
        }
      })
    }

    static createElement(html){
      const div = document.createElement('div')
      div.innerHTML = html
      return div.firstElementChild
    }

    static getPosition(e) {
      var posx = 0;
      var posy = 0;
    
      if (!e) var e = window.event;
    
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + 
                            document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + 
                            document.documentElement.scrollTop;
      }
    
      return {
        x: posx,
        y: posy
      }
    }
}