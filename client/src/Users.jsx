import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

function Users(){
    const [users, setUsers] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000")
        .then(result=>setUsers(result.data))
        .catch(err=>console.error(err.message))
    },[])

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/deleteUser/${id}`)
        .then(res=>{
            window.location.reload()
            console.log(res)
        }).catch(err=>console.error(err.message))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
           <div className="w-50 bg-white rounded p-3">
            <Link to='/create'className="btn btn-success">Add</Link>
            <table className="table">
            <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                            users.map((user)=>{
                                return <tr key={user.c_id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                       <Link to={`/update/${user.c_id}`} className="btn btn-success">Edit</Link>
                                        <button className="btn btn-danger" onClick={()=>handleDelete(user.c_id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
            </table>
           </div>
        </div>
    )
}

export default Users