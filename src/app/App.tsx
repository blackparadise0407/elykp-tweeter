import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { FormWrapper } from 'features/auth'
import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery'
import { AuthLayout } from 'layouts/auth'
import { MainLayout } from 'layouts/main'

function App() {
    const navigate = useNavigate()
    const { data, loading, error } = useCurrentUserQuery()

    useEffect(() => {
        if (error) {
            navigate('/login')
        }
    }, [error])

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<>Home</>} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="register" element={<FormWrapper />} />
                <Route path="login" element={<FormWrapper title="Login" />} />
            </Route>
            <Route path="*" element={<div>Not found...</div>} />
        </Routes>
    )
}

export default App
