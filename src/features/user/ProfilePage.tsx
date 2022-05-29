import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, NotFound, Spinner } from 'components'
import { useGetUserLazyQuery } from 'hooks/useGetUserLazyQuery'

export default function ProfilePage() {
    const { t } = useTranslation()
    const { username } = useParams<{ username: string }>()
    const [getUserLazyQuery, { data, loading, error }] = useGetUserLazyQuery()
    const navigate = useNavigate()

    useEffect(() => {
        getUserLazyQuery({ variables: { username } })
    }, [username])

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <NotFound />
    }

    if (!data?.getUser) return null

    const user = data.getUser

    return (
        <div>
            <div
                className="h-[280px] w-full"
                style={{
                    background:
                        'url(https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80) center no-repeat',
                    backgroundSize: 'cover',
                }}
            ></div>
            <div className="container px-2 md:px-10 lg:px-20 mx-auto -mt-16">
                <div className="flex items-center md:items-start flex-col md:flex-row gap-6 bg-white w-full rounded-lg py-6 px-7">
                    <img
                        className="w-[120px] h-[120px] md:w-[152px] md:h-[152px] border-4 rounded-lg border-white -mt-28 md:-mt-0 md:-translate-y-16"
                        src="https://i.pravatar.cc/152"
                        alt=""
                    />
                    <div>
                        <div className="flex items-center flex-col md:flex-row gap-1 md:gap-6">
                            <span className="text-2xl font-bold text-neutral-800">
                                {user.username}
                            </span>
                            <div className="flex items-center gap-4 capitalize">
                                <span className="font-medium text-xs">
                                    <b>2,569</b>{' '}
                                    <span className="text-neutral-500">
                                        {t('following')}
                                    </span>
                                </span>
                                <span className="font-medium text-xs">
                                    <b>10.8K</b>{' '}
                                    <span className="text-neutral-500">
                                        {t('followers')}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <p className="mt-3 md:mt-6 text-neutral-500 font-medium text-sm md:text-lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nesciunt dolores consectetur distinctio
                            aspernatur incidunt exercitationem ea similique!
                            Reiciendis, quasi minima.
                        </p>
                    </div>
                    <div className="flex-grow hidden md:block"></div>
                    <Button icon={<AiOutlineUserAdd />}>Follow</Button>
                </div>
            </div>
        </div>
    )
}
