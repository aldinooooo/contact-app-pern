import axios from "axios"
import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"

function UpdateUser(){
    const {id}=useParams()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [age,setAge]=useState()
    const Navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/contact/${id}`)
        .then(result=>{
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
            console.log(result)
        }).catch(err=>console.error(err.message))
    },[id])

    const Update = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:5000/updateUser/${id}`,{name,email,age})
        .then(result=>{
            console.log(result)
            Navigate('/')
        }).catch(err=>console.error(err.message))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Update}>
              <h2>Edit user </h2>
                  <div className="mb-2">
                      <label htmlFor="">Name</label>
                      <input type='text' placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className="mb-2">
                      <label htmlFor="">Email</label>
                      <input type='text' placeholder="Enter Email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  <div className="mb-2">
                      <label htmlFor="">Age</label>
                      <input type='text' placeholder="Enter Age" className="form-control" onChange={(e)=>setAge(e.target.value)}/>
                  </div>
                  <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    )
}

export default UpdateUser