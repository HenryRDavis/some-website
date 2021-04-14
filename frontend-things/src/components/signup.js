import React, {useState, useEffect} from 'react'
import SignupSchema from './SignupSchema'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
//redux
import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAIL } from '../store'
import { useDispatch, useSelector } from 'react-redux'

const initialFormValues={
    username: '',
    email: '',
    password: '',
}
const initialErrors={
    username: '',
    email: '',
    password: '',
}


export const SignUpForm = (props) => {
  const reqErr = useSelector(state => state.error)
  const [form, setForm] = useState(initialFormValues)
  const [errors, setErrors] = useState(initialErrors)
  const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        SignupSchema.isValid(form).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [form]);


  const dispatch = useDispatch() 
  const { push } = useHistory()
    

    const handleChange = (e) =>{
        Yup
        .reach(SignupSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
          setErrors({
            ...errors,
            [e.target.name]: ""
          });
        })
        .catch(err => {
          setErrors({
            ...errors,
            [e.target.name]: err.errors[0]
          });
        });
    
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
      e.persist();
      };

    const handleSubmit = (e) =>{
        e.preventDefault()
        const newUser ={
            username: form.username.trim(),
            password: form.password.trim(),
            email: form.email.trim(),
        }
        postNewUser(newUser)
        setForm(initialFormValues)
    }

      const postNewUser = user => {
        dispatch({ type: SIGN_UP_START })
        axios.post('', user)
        .then(res =>{
          dispatch({ type: SIGN_UP_SUCCESS, payload: user})
          window.localStorage.setItem('token', res.data.access_token)
          window.localStorage.setItem('username', form.username);
          push('/home')
        })
        .catch(err =>{
          debugger
          dispatch({ type: SIGN_UP_FAIL, payload: err })
          if ( reqErr.includes("status code 500")){
            setErrors("Sorry, that username has already been taken")
            setForm({
              ...form,
              username: initialFormValues.username
            })
          }
        })
      }

    return (
        <StyledDiv>
            <div>
            {errors? errors.username : <></>}
            {errors? errors.email : <></>}
            {errors? errors.password : <></>}
            </div>
            <form onSubmit={handleSubmit}>
              <h1>
                Signup
              </h1>
                <label>
                <h4>Username</h4>
                    <input 
                    name='username'
                    value={form.username}
                    onChange={(e) =>{handleChange(e)}}>
                    </input>
                </label>
                <br />
                <label>
                <h4>Email</h4>
                    <input 
                    name='email'
                    type='email'
                    value={form.email}
                    onChange={(e) =>{handleChange(e)}}>
                    </input>
                </label>
                <br />
                <label>
                <h4>Password</h4>
                    <input 
                    name='password'
                    type='password'
                    value={form.password}
                    onChange={(e) =>{handleChange(e)}} >
                    </input>
                </label>
                <br />
                <br/>
                <br/>
                <button onClick={handleSubmit} disabled={buttonDisabled}>Sign Up</button>
            </form>
        </StyledDiv>
    )
}
