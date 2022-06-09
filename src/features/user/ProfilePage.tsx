import { yupResolver } from '@hookform/resolvers/yup'
import {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    AiOutlineCamera,
    AiOutlineEdit,
    AiOutlineUserAdd,
} from 'react-icons/ai'
import { Outlet, useParams } from 'react-router-dom'

import { AVATAR_PLACEHOLDER, BANNER_IMAGE_PLACEHOLDER } from 'assets/images'
import {
    Backdrop,
    Button,
    ImageCropper,
    Modal,
    NotFound,
    SideNavigation,
    SimpleUserCard,
    Spinner,
    Textarea,
    TextField,
} from 'components'
import { useToast } from 'contexts/toast/ToastContext'
import { useUploadFileMutation } from 'features/common/hooks/useUploadFileMutation'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'

import { useFollowersLazyQuery } from './hooks/useFollowersLazyQuery'
import { useFollowingsLazyQuery } from './hooks/useFollowingsLazyQuery'
import { useFollowMutation } from './hooks/useFollowMutation copy'
import { useUnfollowMutation } from './hooks/useUnfollowMutation'
import { useUpdateCurrentUserAvatarMutation } from './hooks/useUpdateCurrentUserAvatarMutation'
import { useUpdateCurrentUserProfileMutation } from './hooks/useUpdateCurrentUserProfileMutation'
import { useUserLazyQuery } from './hooks/useUserLazyQuery'
import { profileUpdateSchema } from './schema'

export interface ProfileUpdateForm {
    fullName?: string
    description?: string
}

export default function ProfilePage() {
    const { t } = useTranslation()
    const { enqueue } = useToast()
    const { username } = useParams<{ username: string }>()
    const { data: currentUserData } = useCurrentUserQuery()
    const [userLazyQuery, { data, loading, error }] = useUserLazyQuery()
    const [uploadFileMutation, { loading: uploadFileLoading }] =
        useUploadFileMutation()
    const [updateCurrentUserAvatarMutation, { loading: updateAvatarLoading }] =
        useUpdateCurrentUserAvatarMutation()
    const [
        updateCurrentUserProfileMutation,
        { loading: updateProfileLoading },
    ] = useUpdateCurrentUserProfileMutation()
    const [followMutation] = useFollowMutation()
    const [unfollowMutation] = useUnfollowMutation()
    const [followingsLazyQuery, followingResult] = useFollowingsLazyQuery()
    const [followersLazyQuery, followerResult] = useFollowersLazyQuery()

    const [followList, setFollowList] = useState<{
        data: Relationship[]
        type: 'following' | 'follower' | undefined
    }>({ data: [], type: undefined })
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<ProfileUpdateForm>({
        resolver: yupResolver(profileUpdateSchema),
    })

    const isCurrentUser = useMemo(
        () => currentUserData?.currentUser.id === data?.user.id,
        [currentUserData, data],
    )

    const updateDescription = async () => {
        if (textareaRef.current && textareaRef.current.value) {
            try {
                if (
                    data?.user.profile.description === textareaRef.current.value
                ) {
                    return
                }
                await updateCurrentUserProfileMutation({
                    variables: {
                        updateCurrentUserProfileInput: {
                            description: textareaRef.current.value,
                        },
                    },
                })
                enqueue(t('update_profile_success'), {
                    variant: 'success',
                })
            } catch (e) {}
        }
    }

    // const handleClickEdit = () => {
    //     setTimeout(() => {
    //         if (textareaRef.current) {
    //             textareaRef.current.value =
    //                 data?.getUser.profile.description ?? ''
    //         }
    //     }, 0)
    // }

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
                        enqueue(t('update_avatar_success'), {
                            variant: 'success',
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
                        enqueue(t('update_cover_photo_success'), {
                            variant: 'success',
                        })
                    }
                }
            } catch (e) {}
        },
        [currentUserData],
    )

    const handleUpdateProfile = () => {
        handleSubmit((data) => {})()
    }

    const handleCloseUpdateModal = useCallback(
        () => setIsEditingProfile(false),
        [],
    )

    const handleFollowUser = async () => {
        if (data?.user) {
            try {
                const res = await followMutation({
                    variables: {
                        followingId: data.user.id,
                    },
                })
            } catch (e) {}
        }
    }

    const handleUnfollowUser = async () => {
        if (data?.user) {
            try {
                const res = await unfollowMutation({
                    variables: {
                        unfollowingId: data.user.id,
                    },
                })
            } catch (e) {}
        }
    }

    const getFollowings = async () => {
        if (data?.user) {
            try {
                const res = await followingsLazyQuery({
                    variables: { userId: data.user.id },
                })
                if (res.data?.followings?.length) {
                    setFollowList({
                        data: res.data.followings,
                        type: 'following',
                    })
                }
            } catch (e) {}
        }
    }

    const getFollowers = async () => {
        if (data?.user) {
            try {
                const res = await followersLazyQuery({
                    variables: { userId: data.user.id },
                })
                if (res.data?.followers?.length) {
                    setFollowList({
                        data: res.data.followers,
                        type: 'follower',
                    })
                }
            } catch (e) {}
        }
    }

    useEffect(() => {
        userLazyQuery({ variables: { username } })
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
    if (!data?.user) return null

    const user = data.user

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
                {isCurrentUser && (
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
                            {t('change_cover_photo')}
                        </Button>
                    </ImageCropper>
                )}
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
                    <div className="overflow-hidden">
                        <div className="flex items-center flex-col md:flex-row gap-1 md:gap-6 flex-wrap">
                            <span className="truncate text-2xl font-bold text-neutral-800 dark:text-white">
                                {user.username}
                            </span>
                            <div className="flex items-center gap-4 capitalize">
                                <span
                                    className="font-medium text-xs md:text-sm whitespace-nowrap text-neutral-500 dark:hover:text-white hover:text-black transition-colors cursor-pointer"
                                    onClick={getFollowings}
                                >
                                    <b className="text-black dark:text-white">
                                        {user.followingCount}
                                    </b>{' '}
                                    <span>
                                        {user.followingCount <= 1
                                            ? t('following')
                                            : t('followings')}
                                    </span>
                                </span>
                                <span
                                    className="font-medium text-xs md:text-sm whitespace-nowra text-neutral-500 dark:hover:text-white hover:text-black transition-colors cursor-pointer"
                                    onClick={getFollowers}
                                >
                                    <b className="text-black dark:text-white">
                                        {user.followerCount}
                                    </b>{' '}
                                    <span>
                                        {user.followerCount <= 1
                                            ? t('follower')
                                            : t('followers')}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 md:mt-6 font-medium text-sm md:text-base text-neutral-500">
                            {user?.profile?.description &&
                                user.profile.description}
                        </div>
                    </div>
                    <div className="flex-grow hidden md:block"></div>
                    {isCurrentUser ? (
                        <Button
                            small
                            icon={<AiOutlineEdit />}
                            onClick={() => setIsEditingProfile(true)}
                        >
                            {t('edit_profile')}
                        </Button>
                    ) : (
                        <Button
                            small
                            icon={<AiOutlineUserAdd />}
                            onClick={handleFollowUser}
                        >
                            {t('follow')}
                        </Button>
                    )}
                </div>
                <div className="flex gap-6 mt-6 flex-col md:flex-row">
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
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Modal
                title={t('update_profile')}
                open={isEditingProfile}
                okLabel={t('update')}
                onClose={handleCloseUpdateModal}
                onOk={handleUpdateProfile}
            >
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4 mx-1"
                >
                    <TextField
                        label={t('full_name')}
                        inputProps={{
                            ...register('fullName'),
                        }}
                        error={errors.fullName?.message}
                    />
                    <Textarea
                        label={t('description')}
                        inputProps={{
                            maxRows: 5,
                            minRows: 3,
                            ...register('description'),
                        }}
                        error={errors.description?.message}
                    />
                </form>
            </Modal>
            <Modal
                open={!!followList.data.length}
                title={
                    followList.type === 'follower'
                        ? t('username_follower', {
                              username: data?.user.username,
                          })
                        : t('username_is_following', {
                              username: data?.user.username,
                          })
                }
                onClose={() => setFollowList({ data: [], type: undefined })}
                hasFooter={false}
            >
                {followList.data.map((following) => (
                    <div
                        className="border-b border-neutral-500 last:border-0"
                        key={following.id}
                    >
                        <SimpleUserCard data={following.user} />
                    </div>
                ))}
            </Modal>
        </Fragment>
    )
}
