import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import LoadingGIF from "../../images/loading.gif"

export default function Loading({ path = 'login' }) {//default path for user

    // state
    const [count, setCount] = useState(3)

    // hooks 
    const navigate = useNavigate()
    const location = useLocation()
    // console.log("Current Location:", location)

    useEffect(() => {
        const interval = setInterval(() => {
            // decrementing count one second
            setCount((currentCount) => --currentCount)
        }, 1000)

        // AND operator
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })

        // cleanup
        return () => clearInterval(interval)
    }, [count])

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
            {/* Redirecting you in { count } seconds */}
            <img src={LoadingGIF} style={{ width: "400px" }} alt="Loading" />
        </div>)
}