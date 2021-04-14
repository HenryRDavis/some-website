import * as yup from 'yup'

export default yup.object().shape({
    post_title: yup.string()
    .required('Title is required')
    .min(2, 'Title must be 5 chars or longer'),
    post_content: yup.string()
    .required('Content is required')
    .min(2, 'Content must be 20 chars or longer'),
})