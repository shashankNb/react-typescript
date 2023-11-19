import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { TokenService } from '../Components/Auth/TokenService'

class HttpInterceptor {


   constructor(private tokenService: TokenService) {
   }

   public intercept = () => {
      axios.interceptors.request.use(
         (request: any) => {
            // Do something with the request config, such as adding headers
            console.log('Request Interceptor:', request);
            if (!(request.url.includes('login')
               || request.url.includes('register')
               || request.url.includes('forgot-password')
               || request.url.includes('verify')
               || request.url.includes('update-credentials'))) {
               request.headers.authorization = `Bearer ${this.tokenService.getToken()}`;
            }
            return request;
         },
         (error) => {
            // Handle request error
            return Promise.reject(error);
         }
      );

      axios.interceptors.response.use(
         (response) => {
            // Do something with the response data
            console.log('Response Interceptor:', response);
            return response;
         },
         (error) => {
            // Handle response error
            return Promise.reject(error);
         }
      );
   };
}

const tokenService = new TokenService();
const interceptor = new HttpInterceptor(tokenService);
interceptor.intercept();

