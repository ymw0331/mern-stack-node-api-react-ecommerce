import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminProduct() {
    // context
    const [auth, setAuth] = useAuth()

    return <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 bg-light"><h4>Manage Products</h4></div>

                    Create product form
                </div>
            </div>
        </div>


        <pre>{JSON.stringify(auth, null, 4)}</pre>

    </>



}