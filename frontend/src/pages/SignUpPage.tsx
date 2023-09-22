import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { SignUpRequest } from '../api/users.api'
import { GENDERS } from '../utils/constants'
import {
  checkFieldValidity,
  getObjectKeyByValue,
} from '../utils/commonFunctions'
import { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Link, Navigate } from 'react-router-dom'
import { clearError, signup } from '../store/users.store'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const SignUpPage = () => {
  const [signUpFormData, setSignUpFormData] = useState({} as SignUpRequest)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValidated, setIsValidated] = useState({} as Record<string, any>)
  const [disabled, setDisabled] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const dispatch = useAppDispatch()

  const { userInfo, isAuthed, loading, error } = useAppSelector(
    (state: RootState) => state.users
  )
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let validity = checkFieldValidity(e.target.value, e.target.name)
    if (e.target.value) {
      setSignUpFormData({
        ...signUpFormData,
        [e.target.name]: e.target.value,
      })
    }

    setIsValidated({ ...isValidated, [e.target.name]: validity })
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let signUpData = { ...signUpFormData }
    if (signUpData.password === confirmPassword) {
      setIsValidated({
        ...isValidated,
        confirmPassword: {
          status: true,
          msg: null,
        },
      })
      signUpData['email'] = signUpData['email'].toLocaleLowerCase()
      signUpData['gender'] = signUpData['gender']
        ? signUpData['gender']
        : GENDERS['M']
      await dispatch(signup({ ...signUpData }))
    } else {
      setIsValidated({
        ...isValidated,
        confirmPassword: {
          status: false,
          msg: 'Confirm passowrd and password fields need to be matched!',
        },
      })
    }
  }

  useEffect(() => {
    if (
      Object.values(signUpFormData).length === 0 ||
      Object.values(signUpFormData).filter(
        (v: Record<string, any>) => v.length === 0
      ).length > 0 ||
      Object.values(isValidated).filter((v: Record<string, any>) => !v.status)
        .length > 0 ||
      loading
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [JSON.stringify(isValidated), JSON.stringify(signUpFormData), loading])

  return isAuthed ? (
    <Navigate to='/' />
  ) : (
    <>
      <ToastContainer position='top-end'>
        <Toast
          onClose={() => dispatch(clearError())}
          show={!!error && error.length > 0}
          delay={5000}
          autohide
          className='d-inline-block mx-2 mt-3'
          bg={'danger'}
        >
          <Toast.Header closeButton className='rounded'>
            <span className='me-auto'>
              <strong>Error</strong>
              &nbsp;-&nbsp;
              <span className='text-danger'>{error}</span>
            </span>
          </Toast.Header>
        </Toast>
      </ToastContainer>
      <Row className='align-items-center justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Title className='custom'>Sign Up</Card.Title>
            <Card.Body>
              <Form onSubmit={handleOnSubmit}>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='FullName'>
                      <Form.Label className='label required'>
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        autoComplete='off'
                        placeholder={'John Doe'}
                        name='name'
                        required={true}
                        minLength={2}
                        maxLength={50}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOnChange(e)
                        }
                        isInvalid={
                          isValidated['name']
                            ? !isValidated['name'].status
                            : false
                        }
                        isValid={
                          isValidated['name']
                            ? isValidated['name'].status
                            : null
                        }
                      />
                      {isValidated['name'] && !isValidated['name'].status && (
                        <FormControl.Feedback type='invalid'>
                          {isValidated['name'] ? isValidated['name'].msg : ''}
                        </FormControl.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='Email'>
                      <Form.Label className='label required'>Email</Form.Label>
                      <Form.Control
                        type='email'
                        autoComplete='off'
                        placeholder={'John@johndoe.com'}
                        name='email'
                        maxLength={80}
                        required={true}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleOnChange(e)
                        }
                        isInvalid={
                          isValidated['email']
                            ? !isValidated['email'].status
                            : false
                        }
                        isValid={
                          isValidated['email']
                            ? isValidated['email'].status
                            : null
                        }
                      />
                      {isValidated['email'] && !isValidated['email'].status && (
                        <FormControl.Feedback type='invalid'>
                          {isValidated['email'] ? isValidated['email'].msg : ''}
                        </FormControl.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='Gender'>
                      <Form.Label className='label required'>Gender</Form.Label>
                      <Form.Select
                        required={true}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleOnChange(e)
                        }
                        name='gender'
                        isValid={true}
                      >
                        {Object.values(GENDERS).map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='Password'>
                      <Form.Label className='label required'>
                        Password
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPass ? 'text' : 'password'}
                          autoComplete='new-password'
                          placeholder={'**************'}
                          name='password'
                          minLength={8}
                          maxLength={30}
                          required={true}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOnChange(e)
                          }
                          isInvalid={
                            isValidated['password']
                              ? !isValidated['password'].status
                              : false
                          }
                          isValid={
                            isValidated['password']
                              ? isValidated['password'].status
                              : null
                          }
                        />
                        <InputGroup.Text onClick={() => setShowPass(!showPass)}>
                          {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </InputGroup.Text>
                        {isValidated['password'] && (
                          <FormControl.Feedback
                            type={
                              isValidated['password'] &&
                              !isValidated['password'].status
                                ? 'invalid'
                                : 'valid'
                            }
                          >
                            {isValidated['password'] ? (
                              <>
                                {isValidated['password'] && (
                                  <ul className='password-validations'>
                                    {Object.values(isValidated['password'])
                                      .filter((m) => m !== true && m !== false)
                                      .map((m: unknown) => {
                                        let passwordValidations = m as Record<
                                          string,
                                          any
                                        >
                                        return (
                                          <li
                                            className={
                                              passwordValidations.status
                                                ? 'success'
                                                : 'error'
                                            }
                                            key={getObjectKeyByValue(
                                              isValidated['password'],
                                              m
                                            )}
                                            id={getObjectKeyByValue(
                                              isValidated['password'],
                                              m
                                            )}
                                          >
                                            <small
                                              className={`${
                                                passwordValidations.status
                                                  ? 'text-success'
                                                  : 'color-red'
                                              } my-1`}
                                            >
                                              {passwordValidations.msg || ''}
                                            </small>
                                          </li>
                                        )
                                      })}
                                  </ul>
                                )}
                              </>
                            ) : (
                              ''
                            )}
                          </FormControl.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Form.Group className='mt-2' controlId='confirmPassword'>
                      <Form.Label className='label required'>
                        Confirm Password
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPass ? 'text' : 'password'}
                          autoComplete='new-password'
                          placeholder={'**************'}
                          name='confirmPassword'
                          value={confirmPassword}
                          required={true}
                          onChange={(e: Record<string, any>) => {
                            setConfirmPassword(e.target.value)
                            setIsValidated({
                              ...isValidated,
                              confirmPassword: {
                                status: true,
                                msg: null,
                              },
                            })
                          }}
                          isInvalid={
                            isValidated['confirmPassword']
                              ? !isValidated['confirmPassword'].status
                              : false
                          }
                        />
                        <InputGroup.Text
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                        >
                          {showConfirmPass ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </InputGroup.Text>
                        {isValidated['confirmPassword'] &&
                          !isValidated['confirmPassword'].status && (
                            <FormControl.Feedback type='invalid'>
                              {isValidated['confirmPassword']
                                ? isValidated['confirmPassword'].msg
                                : ''}
                            </FormControl.Feedback>
                          )}
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={'text-center'}
                  >
                    <Button
                      disabled={disabled}
                      className='btn btn-primary my-2 px-3'
                      type='submit'
                    >
                      {loading ? (
                        <div
                          className='spinner-border text-light'
                          role='submit'
                        ></div>
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </Col>
                </Row>
                <small className='d-flex justify-content-center mt-4'>
                  Already with us ? &nbsp;
                  <span
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                    onClick={() => {
                      if (
                        document &&
                        document.getElementById('signin-redirect-link')
                      ) {
                        let redirectLink = document.getElementById(
                          'signin-redirect-link'
                        ) as HTMLElement
                        redirectLink.click()
                      }
                    }}
                    className='text-decoration-underline link-offset-2'
                  >
                    Sign In
                  </span>
                </small>
              </Form>
              <Link to={'/signin'} replace={true} id='signin-redirect-link' />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default SignUpPage
