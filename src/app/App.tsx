import { lazy, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { FormWrapper } from 'features/auth'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'
import { AuthLayout } from 'layouts/auth'
import { MainLayout } from 'layouts/main'

const HomePage = lazy(() => import('features/tweet/HomePage'))
const ProfilePage = lazy(() => import('features/user/ProfilePage'))
const NotFoundPage = lazy(() => import('features/common/NotFoundPage'))

function App() {
    const navigate = useNavigate()
    const { error } = useCurrentUserQuery()

    useEffect(() => {
        if (error) {
            navigate('/login')
        }
    }, [error])

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="explore" element={<>Explore</>} />
                <Route path="bookmarks" element={<>Bookmarks</>} />
                <Route path="hashtag/:name" element={<>Hashtag name</>} />
                <Route path=":username" element={<ProfilePage />}>
                    <Route index element={<>Tweets</>} />
                    <Route path="replies" element={<>Tweets and replies</>} />
                    <Route path="media" element={<>Media</>} />
                    <Route path="likes" element={<>Likes</>} />
                </Route>
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="register" element={<FormWrapper />} />
                <Route path="login" element={<FormWrapper title="Login" />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
