import React from 'react'
import { LoginState } from './Model'
import { Form as FForm, Formik } from 'formik'
import * as yup from 'yup'
import { Button, Col, Form as BForm, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import { AppUrl } from '../../../Constants/AppUrl.constants'
import { TokenService } from '../TokenService'
import { useNavigate } from 'react-router-dom';

class Login extends React.Component<{}, LoginState> {

   public initialValues = { email: '', password: '', rememberMe: false }

   public tokenService: TokenService;

   public validationRules = yup.object().shape({
      email: yup.string().required('Email is required').email('Must be email'),
      password: yup.string().required(),
      rememberMe: yup.boolean().required('It is required').default(true)
   })

   constructor(props: any, tokenService: TokenService) {
      super(props);
      this.tokenService = tokenService;
      this.state = {
         showModal: false,
         isLoading: false,
         error: null,
      }
   }

   submitForm = (e: any) => {
      this.setState({isLoading: true});
      const {email, password, rememberMe} = e;
      axios.post(AppUrl.AUTHENTICATE, e)
         .then(response => this.handleResponse(response))
         .catch(err => console.log(err));
   }

   handleResponse = (data: { [p: string]: any }) => {
      this.tokenService.handleToken(data.token);
      this.setState({isLoading: false});
      const navigate = useNavigate();
      navigate('/home');
   }

   render(): any {
      return (
         <div className={'container'}>
            <Row>
               <Col md={12}>
                  <Modal show={true} centered backdrop="static" keyboard={false}>
                     <Modal.Header closeButton>
                        <Modal.Title className={'h5'}>Login</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        <Formik
                           validationSchema={this.validationRules}
                           onSubmit={this.submitForm}
                           initialValues={this.initialValues}
                           validateOnBlur={false}
                           validateOnChange={false}
                        >
                           {({ handleSubmit, handleChange, values, touched, errors }) => (
                              <FForm className={'horizontal'}>
                                 <Row className='mb-3'>
                                    <BForm.Group as={Col} md='12' controlId='loginValidationForm' className={'mb-2'}>
                                       <BForm.Label>Email</BForm.Label>
                                       <BForm.Control type='text'
                                                      size={'sm'}
                                                      name='email'
                                                      value={values.email}
                                                      onChange={handleChange}
                                                      isValid={touched.email && !errors.email}
                                                      isInvalid={!!errors.email} />
                                       <BForm.Control.Feedback type='invalid'>
                                          {errors.email}
                                       </BForm.Control.Feedback>
                                    </BForm.Group>
                                    <BForm.Group as={Col} md='12' controlId='loginValidationForm'>
                                       <BForm.Label>Password</BForm.Label>
                                       <BForm.Control type='password'
                                                      size={'sm'}
                                                      name='password'
                                                      value={values.password}
                                                      onChange={handleChange}
                                                      isValid={touched.password && !errors.password}
                                                      isInvalid={!!errors.password} />
                                       <BForm.Control.Feedback type='invalid'>
                                          {errors.password}
                                       </BForm.Control.Feedback>
                                    </BForm.Group>
                                    <BForm.Group as={Col} md='12' controlId='loginValidationForm'>
                                       <BForm.Check type='checkbox'
                                                      name='rememberMe'
                                                      checked={values.rememberMe}
                                                      onChange={handleChange}
                                                      isValid={touched.rememberMe && !errors.rememberMe}
                                                      isInvalid={!!errors.rememberMe} />
                                       <BForm.Control.Feedback type='invalid'>
                                          {errors.rememberMe}
                                       </BForm.Control.Feedback>
                                    </BForm.Group>
                                 </Row>
                                 <Row>
                                    <Col>
                                       <Button type='submit' className={'btn btn-sm float-start'}>Login</Button>
                                       <a className={'btn btn-sm float-end'}>Forgot password ?</a>
                                       <div className='clearfix'></div>
                                    </Col>
                                 </Row>
                              </FForm>
                           )}
                        </Formik>
                     </Modal.Body>
                  </Modal>
               </Col>
            </Row>
         </div>
      )
   }
}

export default Login
