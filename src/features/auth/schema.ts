import { object, ref, SchemaOf, string } from 'yup'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const registerSchema: SchemaOf<RegisterForm> = object().shape({
    email: string()
        .email('validation.email_must_be_valid_email')
        .required('validation.email_require'),
    username: string().required('validation.username_require'),
    password: string().required('validation.password_require'),
    // .matches(
    //     /^(?=.*[a-z])/,
    //     'Password must contain at least one lowercase letter',
    // )
    // .matches(
    //     /^(?=.*[A-Z])/,
    //     'Password must contain at least one uppercase letter',
    // )
    // .matches(/^(?=.*\d)/, 'Password must contain at least one number')
    // .matches(
    //     /^(?=.*[@$!%*?&])/,
    //     'Password must contain at least one special character',
    // )
    // .min(8, 'Password must have minimum eight characters'),
    confirmPassword: string()
        .required('validation.confirm_password_require')
        .oneOf([ref('password')], 'validation.password_no_match'),
})

export const loginSchema: SchemaOf<LoginForm> = object().shape({
    username: string().required('validation.username_require'),
    password: string()
        .min(3, 'validation.password_must_contain_minimum_3_characters')
        .max(128, 'validation.password_must_contain_maximum_128_characters')
        .required('validation.password_require'),
})
