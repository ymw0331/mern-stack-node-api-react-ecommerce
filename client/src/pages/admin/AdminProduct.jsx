import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

export default function AdminProduct() {


    // context
    const [auth, setAuth] = useAuth()

    // state
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [shipping, setShipping] = useState("")
    const [quantity, setQuantity] = useState("")

    useEffect(() => {
        loadCategories()
    },)

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories")
            setCategories(data)
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 bg-light"><h4>Manage Products</h4></div>

                    {/* image preview */}
                    {photo &&
                        (<div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product photo"
                                className="img img-responsive"
                                height="200px"
                            />
                        </div>)
                    }



                    <div className="pt-2">
                        <label className="btn btn-outline-secondary col-12 mb-3">
                            {photo ? photo?.name : "Upload photo"}
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                // onChange={(e) => console.log(e.target.files)} 
                                hidden
                            />
                        </label>
                    </div>

                    {/* category dropdown */}
                    <Select
                        showSearch
                        bordered={false}
                        size="large"
                        className="form-select mb-3"
                        placeholder="Choose Category"
                        // onChange={(value) => console.log(value)}
                        onChange={(value) => setCategory(value)}
                    >
                        {categories?.map((c) =>
                            <Option key={c._id} value={c.name}>

                            </Option>)}
                    </Select>
                    {categories.length}
                </div>
            </div>
        </div>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>

}