import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import Modal from 'antd/es/modal/Modal'
import axios from 'axios'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppUrl } from '../../../constants/app-url.constants'
import { TokenService } from '../token.service'

export interface LoginState {
    showModal: boolean;
    isLoading: boolean;
    error: null;
}

export interface LoginProps {
    name?: string;
}

const Login: FC<LoginProps> = (props, context) => {

    let navigate = useNavigate();

    const [state, setState] = useState<LoginState>({
        error: null,
        isLoading: false,
        showModal: true
    });

    const initialValues = { email: '', password: '', rememberMe: false }

    const submitForm = (e: any) => {
        setState((prevState) => ({ ...prevState, isLoading: false }))
        const { email, password, rememberMe } = e

        axios.post(AppUrl.AUTHENTICATE, e)
            .then(response => handleResponse(response))
            .catch(err => console.log(err))
    }

    const handleResponse = (data: { [p: string]: any }) => {
        TokenService.handleToken(data.token)
        setState(prev => ({ ...prev, isLoading: false }))
        return navigate('/home')
    }

    return (
        <Modal title='Basic Modal' open={true} onCancel={() => setState((state) => ({ ...state, showModal: false }))}>
            <Form name='normal_login'
                className='login-form'
                initialValues={initialValues}
                onFinish={submitForm}>

                <Form.Item name='username'
                    rules={[{ required: true, message: 'Please input your Username!' }]}>
                    <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
                </Form.Item>

                <Form.Item name='password'
                    rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input prefix={<LockOutlined className='site-form-item-icon' />}
                        type='password'
                        placeholder='Password' />
                </Form.Item>

                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className='login-form-forgot' href=''>Forgot password</a>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' danger htmlType='submit' className='login-form-button'>Log in</Button>
                    Or <a href=''>register now!</a>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Login;
