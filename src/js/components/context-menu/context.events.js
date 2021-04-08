import actionsObj from './context-menu-actions/exportActions.js'


/**
 * All imports must be at the begining of this file
 * key: "Element name"
 * value: "Function"
 */
export default {
    optionEvents: ({context}) => {
        context.querySelectorAll('.option').forEach( optionElement => {
            const action = optionElement.dataset.action
            optionElement.addEventListener('click', actionsObj[action])
        })
    },
}