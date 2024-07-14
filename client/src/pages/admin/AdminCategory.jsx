import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast"
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from 'antd';


export default function AdminCategory() {
    // context
    const [auth, setAuth] = useAuth()

    // state
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatingName, setUpdatingName] = useState(null)

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

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const { data } = await axios.post('/category', { name })
            if (data?.error) {
                toast.error(data.error)
            } else {
                loadCategories()
                setName("") //once created, set name to empty string
                toast.success(`${data.name} is created`)
            }
            console.log('Post this category =>', name)
        } catch (error) {
            console.log(error)
            toast.error("Create category failed. Try again.")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/category/${selected._id}`, {
                name: updatingName
            })

            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is updated`)
                setSelected(null)
                setUpdatingName('')
                loadCategories()
                setVisible(false)
            }

            console.log("update category => ", updatingName)

        } catch (error) {
            console.log(error)
            toast.error("Category may already exist")
        }

    }


    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.delete(`/category/${selected._id}`)

            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is deleted`)
                setSelected(null)
                loadCategories()
                setVisible(false)
            }
            console.log("delete category => ", selected.name)

        } catch (error) {
            console.log(error)
            toast.error("Category cannot be deleted")
        }

    }


    return <>
        <Jumbotron
            title={`Hello ${auth?.user?.name}`}
            subTitle="Admin Category"
        />

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 bg-light"><h4>Manage Categories</h4></div>
                    <CategoryForm
                        value={name}
                        setValue={setName}
                        handleSubmit={handleSubmit}
                    />

                    <hr />

                    <div className="col">
                        {categories?.map((c) =>
                            <div
                                className="btn btn-outline-primary m-3" onClick={() => {
                                    setVisible(true)
                                    setSelected(c)
                                    setUpdatingName(c.name)
                                }}
                            >
                                {c.name}
                            </div>
                        )}
                    </div>

                    <Modal
                        open={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        footer={null}
                    >
                        <CategoryForm
                            value={updatingName}
                            setValue={setUpdatingName}
                            handleSubmit={handleUpdate}
                            handleDelete={handleDelete}
                            buttonText="Update"
                        />

                    </Modal>

                </div>
            </div>
        </div>


        <pre>{JSON.stringify(auth, null, 4)}</pre>

    </>



}