import { AppUrl } from '../../constants/app-url.constants'

export const TokenService = {
    iss: { login: AppUrl.AUTHENTICATE, signUp: AppUrl.SIGN_UP},
    setToken: (token: string): void => localStorage.setItem('token', token),
    handleToken: (token: string): void => TokenService.setToken(token),
    removeToken: (): void => localStorage.removeItem('token'),
    getToken: (): string | null => localStorage.getItem('token')
}
