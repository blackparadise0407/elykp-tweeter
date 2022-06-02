import {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
    AiOutlineCamera,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineEdit,
    AiOutlineUserAdd,
} from 'react-icons/ai'
import { Outlet, useParams } from 'react-router-dom'

import { AVATAR_PLACEHOLDER, BANNER_IMAGE_PLACEHOLDER } from 'assets/images'
import {
    Backdrop,
    Button,
    ImageCropper,
    NotFound,
    SideNavigation,
    Spinner,
} from 'components'
import { useUploadFileMutation } from 'features/common/hooks/useUploadFileMutation'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'

import { useGetUserLazyQuery } from './hooks/useGetUserLazyQuery'
import { useUpdateCurrentUserAvatarMutation } from './hooks/useUpdateCurrentUserAvatarMutation'
import { useUpdateCurrentUserProfileMutation } from './hooks/useUpdateCurrentUserProfileMutation'

export default function ProfilePage() {
    const { t } = useTranslation()
    const { username } = useParams<{ username: string }>()
    const { data: currentUserData } = useCurrentUserQuery()
    const [getUserLazyQuery, { data, loading, error }] = useGetUserLazyQuery()
    const [uploadFileMutation, { loading: uploadFileLoading }] =
        useUploadFileMutation()
    const [updateCurrentUserAvatarMutation, { loading: updateAvatarLoading }] =
        useUpdateCurrentUserAvatarMutation()
    const [
        updateCurrentUserProfileMutation,
        { loading: updateProfileLoading },
    ] = useUpdateCurrentUserProfileMutation()
    const [isEditingDesc, setIsEditingDesc] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const isCurrentUser = useMemo(
        () => currentUserData?.currentUser.id === data?.getUser.id,
        [currentUserData, data],
    )

    const updateDescription = async () => {
        if (textareaRef.current && textareaRef.current.value) {
            try {
                if (
                    data?.getUser.profile.description ===
                    textareaRef.current.value
                ) {
                    setIsEditingDesc(false)
                    return
                }
                await updateCurrentUserProfileMutation({
                    variables: {
                        updateCurrentUserProfileInput: {
                            description: textareaRef.current.value,
                        },
                    },
                })
                setIsEditingDesc(false)
            } catch (e) {}
        }
    }

    const handleClickEdit = () => {
        setIsEditingDesc(true)
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.value =
                    data?.getUser.profile.description ?? ''
            }
        }, 0)
    }

    const handleUploadAvatar = useCallback(
        async (file: File) => {
            try {
                if (currentUserData?.currentUser) {
                    const { data } = await uploadFileMutation({
                        variables: {
                            fileUploadInput: {
                                userId: currentUserData?.currentUser.id,
                                file,
                            },
                        },
                    })
                    if (data?.uploadFile) {
                        await updateCurrentUserAvatarMutation({
                            variables: {
                                avatarId: data?.uploadFile.id,
                            },
                        })
                    }
                }
            } catch (e) {}
        },
        [currentUserData],
    )

    const handleUploadCoverPhoto = useCallback(
        async (file: File) => {
            try {
                if (currentUserData?.currentUser) {
                    const { data } = await uploadFileMutation({
                        variables: {
                            fileUploadInput: {
                                userId: currentUserData?.currentUser.id,
                                file,
                            },
                        },
                    })
                    if (data?.uploadFile) {
                        await updateCurrentUserProfileMutation({
                            variables: {
                                updateCurrentUserProfileInput: {
                                    coverPhotoId: data.uploadFile.id,
                                },
                            },
                        })
                    }
                }
            } catch (e) {}
        },
        [currentUserData],
    )

    useEffect(() => {
        getUserLazyQuery({ variables: { username } })
    }, [username])

    if (loading) {
        return (
            <Backdrop centerChildren>
                <Spinner size="lg" />
            </Backdrop>
        )
    }

    if (error) {
        return <NotFound />
    }
    if (!data?.getUser) return null

    const user = data.getUser

    return (
        <Fragment>
            <div
                className="relative h-[280px] w-full"
                style={{
                    backgroundImage: `url(http://localhost:5000/api/attachment/${user?.profile.coverPhotoId}), url(${BANNER_IMAGE_PLACEHOLDER})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <ImageCropper
                    loading={uploadFileLoading || updateProfileLoading}
                    aspect={3 / 1}
                    onConfirm={handleUploadCoverPhoto}
                >
                    <Button
                        small
                        icon={<AiOutlineCamera />}
                        className="absolute top-2 right-2"
                    >
                        Change cover photo
                    </Button>
                </ImageCropper>
            </div>
            <div className="container relative z-[1] px-2 md:px-10 lg:px-20 mx-auto -mt-16">
                <div className="flex items-center md:items-start flex-col md:flex-row gap-6 bg-white dark:bg-neutral-800 shadow w-full rounded-lg py-6 px-7 min-h-[163px]">
                    <div
                        className="relative w-[120px] h-[120px] md:w-[152px] md:h-[152px] aspect-square border-4 rounded-lg border-white -mt-28 md:-mt-20"
                        style={{
                            background: `url(${AVATAR_PLACEHOLDER}) center no-repeat`,
                            backgroundSize: 'contain',
                        }}
                    >
                        <img
                            className="absolute w-full rounded"
                            src={`http://localhost:5000/api/attachment/${user.avatarId}`}
                            alt=""
                        />
                        {isCurrentUser && (
                            <ImageCropper
                                loading={
                                    uploadFileLoading || updateAvatarLoading
                                }
                                onConfirm={handleUploadAvatar}
                            >
                                <div className="absolute bottom-2 right-2 rounded-lg bg-white shadow p-1 cursor-pointer">
                                    <AiOutlineCamera className="text-xl text-neutral-700" />
                                </div>
                            </ImageCropper>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center flex-col md:flex-row gap-1 md:gap-6 flex-wrap">
                            <span className="flex-1 min-w-0 truncate text-2xl font-bold text-neutral-800 dark:text-white">
                                {user.username}
                            </span>
                            <div className="flex items-center gap-4 capitalize">
                                <span className="font-medium text-xs md:text-sm whitespace-nowrap">
                                    <b className="text-black dark:text-white">
                                        2,569
                                    </b>{' '}
                                    <span className="text-neutral-500">
                                        {t('following')}
                                    </span>
                                </span>
                                <span className="font-medium text-xs md:text-sm whitespace-nowrap">
                                    <b className="text-black dark:text-white">
                                        10.8K
                                    </b>{' '}
                                    <span className="text-neutral-500">
                                        {t('followers')}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-6 font-medium text-sm md:text-base text-neutral-500">
                            {isEditingDesc ? (
                                <div className="relative">
                                    <textarea
                                        ref={textareaRef}
                                        className="textarea text-sm h-[80px] text-black dark:text-white ring-2 p-2 ring-blue-300 rounded-lg bg-transparent"
                                        maxLength={255}
                                    ></textarea>
                                    <div className="absolute flex gap-2 bottom-3 right-2 text-neutral-500 text-2xl">
                                        <AiOutlineCloseCircle
                                            className="cursor-pointer hover:text-red-500 transition-colors"
                                            onClick={() =>
                                                setIsEditingDesc(false)
                                            }
                                        />
                                        <AiOutlineCheckCircle
                                            className="cursor-pointer hover:text-green-500 transition-colors"
                                            onClick={updateDescription}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <p className="">
                                    {user?.profile?.description &&
                                        user.profile.description}
                                    {isCurrentUser && (
                                        <>
                                            {' '}
                                            <AiOutlineEdit
                                                className="inline text-xl cursor-pointer dark:text-white hover:text-blue-500 transition-colors"
                                                onClick={handleClickEdit}
                                            />
                                        </>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow hidden md:block"></div>
                    <Button small icon={<AiOutlineUserAdd />}>
                        Follow
                    </Button>
                </div>
                <div className="flex gap-6 mt-6">
                    <SideNavigation
                        items={[
                            { to: '', transKey: 'tweets', cb: () => {} },
                            {
                                to: 'replies',
                                transKey: 'tweets_and_replies',
                                cb: () => {},
                            },
                            { to: 'media', transKey: 'media', cb: () => {} },
                            { to: 'likes', transKey: 'likes', cb: () => {} },
                        ]}
                    />
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
