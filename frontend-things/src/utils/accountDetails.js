import axiosWithAuth from './axiosWithAuth'
// import { useParams } from 'react-router-dom'

function fetchAccountDetails (user) {
    // const { username } = user
    const username = window.localStorage.getItem('username')
    
    return axiosWithAuth()
        .get(`/username/${ username.toLowerCase() }` )
        .then( res => { 
            return res
        }).catch( err => {
            console.log(err)
        })
}

export default fetchAccountDetails