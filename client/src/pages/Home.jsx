import Jumbotron from "../components/cards/Jumbotron"
import { useAuth } from "../context/auth"


export default function Home() {

    // use this if we dont have useAuth exported
    // const [auth, setAuth] = useContext(AuthContext)
    const [auth, setAuth] = useAuth()

    return (
        <div>
            <Jumbotron title="Hello World" subTitle="This is super cool" />

            <pre>{JSON.stringify(auth, null, 4)}</pre>

            <h1>This is home page</h1>
        </div>
    )

}