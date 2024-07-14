import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";

export default function UserProfile() {
    // context
    const [auth, setAuth] = useAuth()

    return <>
        <Jumbotron
            title={`Hello ${auth?.user?.name}`}
            subTitle="User Profile"

        />

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>

                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 bg-light"><h4>Profile</h4></div>
                    update form...
                </div>
            </div>
        </div>

        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
}