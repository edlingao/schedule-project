import actions from '../actions.js'
import create from './create.js'
import dark from './dark.js'
import light from './light.js'

const actionsObj = {}
const selectAction = (action) => {
    let selectedCallBack = () => {}
    switch (action){

        case 'dark':
            selectedCallBack = dark
        break

        case 'light':
            selectedCallBack = light
        break

        case 'create':
            selectedCallBack = create
        break
        
    }
    return selectedCallBack
}
actions.forEach(action => {
    actionsObj[action] = selectAction(action)
})
export default actionsObj