import axios from 'axios'
import { TokenService } from '../components/Auth/token.service'


const interceptRequest = () => {

    axios.interceptors.request.use(
        (request: any) => {
            // Do something with the request config, such as adding headers
            if (!(request.url.includes('login')
                || request.url.includes('register')
                || request.url.includes('forgot-password')
                || request.url.includes('verify')
                || request.url.includes('update-credentials'))) {
                const token = TokenService.getToken()
                request.headers.authorization = `Bearer ${token}`
            }
            return request
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        (response) => {
            // Do something with the response data
            console.log('Response Interceptor:', response)
            return response
        },
        (error) => {
            // Handle response error
            return Promise.reject(error)
        }
    )
}

interceptRequest();

