import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { NOT_FOUND } from 'assets/images'
import { Button } from 'components/Button'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center space-y-2">
            <img className="max-w-[400px]" src={NOT_FOUND} alt="" />
            <p className="text-2xl font-bold text-black dark:text-white">
                Sorry, the page was not found
            </p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
            <Button
                onClick={() => navigate(-1)}
                icon={<AiOutlineLeft />}
                type="link"
            >
                Go back
            </Button>
        </div>
    )
}
