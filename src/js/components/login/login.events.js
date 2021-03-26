import routes from '../../routes.js'
/**
 * All imports must be at the begining of this file
 * key: "Element name"
 * value: "Function"
 */

export default {
    defaultFun: () => {

    },

    registerEvents: (loginElement) => {
        const email = loginElement.querySelector('input[name="email"]').value
        const password = loginElement.querySelector('input[name="password"]').value
        const name = loginElement.querySelector('input[name="name"]').value
        Request.POST(routes.register, {action: 'register', params: { email, password, name} } ).then( data => {
            if(data.message != null ){
                throw data.message
            }
            if(data.user != null ){
                loginElement.changeForm()
                toastr.success(`Registro del usuario ${name} existoso, puede iniciar sesion`)
            }
        }).catch( err => {
            toastr.error(err.message)
        })
    },
    loginEvents: (loginElement) => {
        const email = loginElement.querySelector('input[name="email"]').value
        const password = loginElement.querySelector('input[name="password"]').value
        Request.POST(routes.login, {action: 'login', params: { email, password} } ).then( data => {
            if(data.message != null ){
                throw data.message
            }

            if(data.token != null ){
                localStorage.setItem('token', data.token)
                window.location.reload()
            }
        }).catch( err => {
            toastr.error(err.message)
        })
    },

}