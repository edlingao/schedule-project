import create from './create.js'
import dark from './dark.js'
import light from './light.js'
import logout from './logOut.js'
import actions from '../menu-actions.js'
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
        case 'logout':
            selectedCallBack = logout
        break
        
    }
    return selectedCallBack
}
actions.forEach(action => {
    actionsObj[action] = selectAction(action)
})
export default actionsObj