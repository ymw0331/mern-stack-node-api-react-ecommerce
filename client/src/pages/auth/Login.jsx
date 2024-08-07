import { useState } from "react"
import Jumbotron from "../../components/cards/Jumbotron"
import axios from "axios"
import toast from "react-hot-toast"
import { useAuth } from "../../context/auth"
import { useNavigate, useLocation } from "react-router-dom"

export default function Login() {

    // state
    const [email, setEmail] = useState('ymw0331@gmail.com')
    const [password, setPassword] = useState('ymw123')

    // hook
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/login`, {
                email,
                password
            })
            console.log(data)
            if (data?.error) {
                toast.error(data.error)
            } else {
                // save data to local storage
                localStorage.setItem('auth', JSON.stringify(data))
                setAuth({ ...auth, token: data.token, user: data.user })
                toast.success("Login successful")
                navigate(location.state || `/dashboard/${data?.user?.role === 1 ? 'admin' : 'user'}`)
                // either to navigate from previous location or to dashboard
            }
        } catch (error) {
            console.log(error)
            toast.error("Login failed. Try again.")
        }
    }

    return (
        <div>
            <Jumbotron title="Login" />
            {/* Name */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <input type="email"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input type="password"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={handleSubmit}>
                                Login</button>
                        </form>
                    </div>
                </div>
            </div>


            <pre>{JSON.stringify(email, null, 4)}</pre>
            <pre>{JSON.stringify(password, null, 4)}</pre>
        </div>
    )

} 