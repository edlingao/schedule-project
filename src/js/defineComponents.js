import components from './components/componentModule.js'

export default () => {
    components.forEach( component => {
        customElements.define( component.tagName, component)
    })
}