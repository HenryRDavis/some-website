import * as yup from 'yup'

export default yup.object().shape({
    username: yup.string()
    .required('username is required')
    .min(2, 'Name must be 2 chars or longer'),
    password: yup.string()
    .required('password is required')
    .min(2, 'password must be 2 chars or longer'),
})