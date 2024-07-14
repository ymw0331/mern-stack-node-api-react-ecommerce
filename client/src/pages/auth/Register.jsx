import { useState } from "react"
import Jumbotron from "../../components/cards/Jumbotron"
import axios from "axios"
import toast from "react-hot-toast"

export default function Register() {

    // state
    const [name, setName] = useState("Wayne")
    const [email, setEmail] = useState('ymw0331@gmail.com')
    const [password, setPassword] = useState('ymw123')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/register`,
                {
                    name,
                    email,
                    password
                }
            )
            console.log(data)
            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success("Registration successful")
            }
        } catch (error) {
            console.log(error)
            toast.error("Registration failed. Try again.")
        }
    }

    return (
        <div>
            <Jumbotron title="Register" />
            {/* Name */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                className="form-control mb-4 p-2"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />

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
                                Register</button>
                        </form>
                    </div>
                </div>
            </div>


            <pre>{JSON.stringify(name, null, 4)}</pre>
            <pre>{JSON.stringify(email, null, 4)}</pre>
            <pre>{JSON.stringify(password, null, 4)}</pre>
        </div>
    )

} 