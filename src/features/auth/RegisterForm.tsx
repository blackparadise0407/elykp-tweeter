import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'

import { Button, TextField } from 'components'
import { REGISTER_MUTATION } from 'graphqlClient/queries/authQuery'

import { registerSchema } from './schema'

export interface RegisterForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterForm() {
    const [registerMutation, { loading }] = useMutation<{
        register: string
    }>(REGISTER_MUTATION)
    const { t } = useTranslation()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterForm>({
        mode: 'all',
        resolver: yupResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterForm) => {
        try {
            const res = await registerMutation({
                variables: { registerInput: data },
            })
            console.log(res)
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
                    ...register('email'),
                    type: 'email',
                    placeholder: t('email'),
                }}
                icon={<AiOutlineMail />}
                error={errors.email?.message}
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
            <TextField
                inputProps={{
                    ...register('confirmPassword'),
                    type: 'password',
                    placeholder: t('confirm_password'),
                }}
                icon={<AiOutlineLock />}
                error={errors.confirmPassword?.message}
            />

            <Button loading={loading} disabled={loading} block type="primary">
                {t('start_coding_now')}
            </Button>
        </form>
    )
}
