import { environment } from '../../environments/environment'

export const AppUrl = {
    AUTHENTICATE: environment.apiBasePath + '/login',
    SIGN_UP: environment.apiBasePath + '/register'
}
