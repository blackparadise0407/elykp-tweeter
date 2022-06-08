import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'

export default function MainLayout() {
    return (
        <div className="h-screen bg-neutral-100 dark:bg-neutral-700 overflow-y-auto">
            <NavBar />
            <Outlet />
        </div>
    )
}
