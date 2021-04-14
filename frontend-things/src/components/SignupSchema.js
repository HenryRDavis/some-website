import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstname: Yup
    .string()
    .required('Username is Required'),
    email: Yup
    .string()
    .required('Email is required')
    .email('Please input a valid email'),
    password: Yup
    .string()
    .required('Password is required'),
})

export default SignupSchema