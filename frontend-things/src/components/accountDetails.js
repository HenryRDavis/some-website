import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { LOAD_START, LOAD_SUCCESS, LOAD_FAILURE } from '../store'

const initialUser = {
    username: '',
    firstname: '',
    lastname:'',
    email: ''
}

export const AccountSettings = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userToEdit, setUserToEdit] = useState(initialUser)
    const [allUsers, setAllUsers] = useState([])
    const [editing, setEditing] = useState(false)
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: LOAD_START })
        axiosWithAuth()
        .get(`/username/${window.localStorage.getItem("username")}`)
        .then(res=>{
            dispatch({ type: LOAD_SUCCESS, payload: res.data})
            console.log('OUR NOBLE USER', res)
            setUserToEdit(res.data)
        })
        .catch(err => dispatch({ type: LOAD_FAILURE}))
        //grab all users
        axiosWithAuth()
        .get('/users')
        .then(res=>{
            console.log('allusers', res)
            setAllUsers(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    const editUser = (user) => {
        setEditing(true)
        setUserToEdit(user)
    }

    const saveEdit = (e) => {
        const editing = {
            username: userToEdit.username,
            lastname: userToEdit.lastname,
            email: userToEdit.email
        }
        e.preventDefault()
        console.log('look here', editing)
        axiosWithAuth()
        .put(`/users/${user.userid}`, editing)
        .then(res =>{
            console.log('update change', res)
            dispatch({type: 'UPDATE_USER', payload: editing})
            setEditing(false)
        })
        .catch(err => {
            console.log('wrong', err)
        })
    }
    const deleteUser = (e) => {
        axiosWithAuth()
        .delete(`/users/${user.userid}`)
        .then(res=>{ console.log('delete user', res)
            setAllUsers(allUsers.filter((item)=> item.id !== user.id))
            console.log('from delete', user)
            history.push('/login')
        })
        .catch(err=>{
            console.log(err)
        })
    }
 
    const handleChange = (e) =>{
        setUserToEdit ({...userToEdit, [ e.target.name]: e.target.value })
    }
    return (
        <div>
        <h2> Account Settings </h2>
        <Container>
            <StyledDetails>
                <p>Username: {user.username} </p>
                <p>Email: {user.email}</p>
                <StyledButton>
                <button onClick={()=> editUser(user)}>Edit Account</button>
                <button onClick={()=> deleteUser()}>Delete Account</button>
                </StyledButton>
            </StyledDetails>
            <br/>
            {editing && (
            <form onSubmit={saveEdit}>
                <input placeholder='username'type="text" name='username' value={userToEdit.username} onChange={handleChange}/>
                <input placeholder='email' type="text" name='email'value={userToEdit.email} onChange={handleChange}/>
                <button>Update</button>
            </form>
            )} 
    </Container>
    </div>
    );
};