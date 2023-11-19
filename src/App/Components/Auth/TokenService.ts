import { AppUrl } from '../../Constants/AppUrl.constants'

export class TokenService {

   private iss = {
      login: AppUrl.AUTHENTICATE,
      signUp: AppUrl.SIGN_UP,
   };

   constructor() {
   }

   handleToken = (token: string) => {
      this.setToken(token);
   }

   setToken = (token: string) => {
      localStorage.setItem('token', token);
   }

   getToken = (): string => {
      return localStorage.getItem('token') || '';
   }

   removeToken = () => {
      localStorage.removeItem('token');
   }
}
