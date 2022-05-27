import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Button, TextField } from 'components'
import { ACCESS_TOKEN } from 'constants/storage'
import { LOGIN_MUTATION } from 'graphqlClient/queries/authQuery'

import { loginSchema } from './schema'

export interface LoginForm {
    username: string
    password: string
}

export default function LoginForm() {
    const navigate = useNavigate()
    const [loginMutation, { loading }] = useMutation<
        { login: { accessToken: string; user: any } },
        { loginInput: LoginForm }
    >(LOGIN_MUTATION)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: 'all',
        resolver: yupResolver(loginSchema),
    })
    const { t } = useTranslation()

    const onSubmit = async (payload: LoginForm) => {
        try {
            const { data } = await loginMutation({
                variables: { loginInput: payload },
            })
            if (data?.login) {
                const { accessToken } = data.login
                sessionStorage.setItem(ACCESS_TOKEN, accessToken)
                navigate('/')
            }
        } catch (e) {}
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                inputProps={{
                    ...register('username'),
                    placeholder: t('username'),
                }}
                icon={<AiOutlineUser />}
                error={errors.username?.message}
            />

            <TextField
                inputProps={{
                    ...register('password'),
                    type: 'password',
                    placeholder: t('password'),
                }}
                icon={<AiOutlineLock />}
                error={errors.password?.message}
            />
            <Button loading={loading} block type="primary">
                {t('start_coding_now')}
            </Button>
        </form>
    )
}
