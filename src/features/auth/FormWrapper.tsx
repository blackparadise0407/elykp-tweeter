import { useMemo } from 'react'
import {
    AiFillFacebook,
    AiFillGithub,
    AiOutlineGoogle,
    AiOutlineTwitter,
} from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

interface FormWrapperProps {
    title?: string
}

export default function FormWrapper({ title }: FormWrapperProps) {
    const { pathname } = useLocation()
    const isLogin = useMemo(() => pathname.endsWith('/login'), [pathname])

    return (
        <div className="p-5 md:py-14 md:px-16 max-w-[473px] w-full rounded-xl md:border border-gray-300 space-y-5">
            <h6 className="text-xs text-black dark:text-white">
                ElykP Tweeter
            </h6>
            {title ? (
                <h3 className="text-center text-black dark:text-white">
                    {title}
                </h3>
            ) : (
                <>
                    <h4 className="text-black dark:text-white">
                        Join thousands of learners from <br /> around the world
                    </h4>
                    <p className="text-sm md:text-base text-gray-700 dark:text-white">
                        Master web development by making real-life projects.
                        There are multiple paths for you to choose
                    </p>
                </>
            )}
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <p className="text-sm text-gray-500 text-center">
                or continue with these social profile
            </p>
            <div className="flex items-center justify-center gap-5 text-4xl text-gray-400">
                <AiOutlineGoogle className="p-2 border border-gray-400 rounded-full" />
                <AiFillFacebook className="p-2 border border-gray-400 rounded-full" />
                <AiOutlineTwitter className="p-2 border border-gray-400 rounded-full" />
                <AiFillGithub className="p-2 border border-gray-400 rounded-full" />
            </div>
            <p className="text-sm text-gray-500 text-center">
                {isLogin ? (
                    <>
                        Don’t have an account yet?{' '}
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        Already a member? <Link to="/login">Login</Link>
                    </>
                )}
            </p>
        </div>
    )
}
