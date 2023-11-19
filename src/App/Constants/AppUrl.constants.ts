import { environment } from '../../environments/environment'

export class AppUrl {
   static readonly AUTHENTICATE = environment.apiBasePath + '/login';
   static readonly SIGN_UP = environment.apiBasePath + '/register';
}
