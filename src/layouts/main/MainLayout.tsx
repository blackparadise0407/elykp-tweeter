import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'

export default function MainLayout() {
    return (
        <div
            id="main"
            className="min-h-screen bg-neutral-100 dark:bg-neutral-700"
        >
            <NavBar />
            <Outlet />
        </div>
    )
}
