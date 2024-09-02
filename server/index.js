const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./models/db')

//middleware
app.use(cors())
app.use(express.json())

//ROUTES//

//get all contacts
app.get ('/',async(req,res)=>{
  try {
    const allContacts = await pool.query("SELECT * FROM contacts")
    console.log(req.body)
    res.json(allContacts.rows)
  } catch (err) {
    console.error(err.message)
  }
})
//get one contact
app.get ('/contact/:id',async(req,res)=>{
  try {
    const{id}=req.params.id
    const contact = await pool.query("SELECT * FROM contacts WHERE c_id=$1",[id])
    res.json(contact.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})
//create a contact
app.post('/createUser',async(req,res)=>{
  try {
    const {name,email,age} = req.body
    const newContact = await pool.query("INSERT INTO contacts(name,email,age) VALUES($1,$2,$3) RETURNING*",
      [name,email,age])
    res.json(newContact.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})
//update a contact
app.put('/updateUser/:id',async(req,res)=>{
  try {
    const {id} = req.params
    const {name,email,age} = req.body
    const updateContact = await pool.query("UPDATE contacts SET name =$1 ,email =$2, age=$3 WHERE c_id=$4",[name,email,age,id])
    res.json('Contact was updated')
  } catch (err) {
    console.error(err.message)
  }
})

//delete a contact
app.delete('/deleteUser/:id',async(req,res)=>{
  try {
    const {id} = req.params
    const deleteContact = await pool.query("DELETE FROM contacts WHERE c_id=$1",[id])
    res.json('Contact was deleted successfully') 
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000,()=>{
  console.log('server is running fine')
})