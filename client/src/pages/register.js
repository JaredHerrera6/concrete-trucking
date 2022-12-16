import React from 'react'
import Layout from '../components/layout'
import {useState} from 'react'
import { onRegistration } from '../api/auth'

function Register() {
  const [values,setValues] = useState({
    first_name:'',
    last_name:'',
    email:'',
    phone:'',
    address:'',
    username:'',
    password:''
  })
  const [error,setError] = useState(false)
  const [success, setSuccess] = useState(false)
//State of value are being changed
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    try{
      // have to await for the function to complete
      //only until it completes, we will proceed to the next line
      const {data} = await onRegistration(values)
      //Set the Error to '' to show that there was no error
      setError('')
      // Set the success message
      setSuccess(data.message)
      // After the registration was a success, reset the values of the registration values, set to ''
      setValues({first_name:'',
      last_name:'',
      email:'',
      phone:'',
      address:'',
      username:'',
      password:''})

    }catch(error){
      console.log(error.response.data.errors[0].msg)
      //Sets the first error caught in the response. 
      //Allows us to store the error to be able to use it or display it.
      setError(error.response.data.errors[0].msg)
      //Set the success message to empty string because there was no success
      setSuccess('')
    }
  }

  return (
    <Layout>
      <form onSubmit = {(e) => onSubmit(e)} className = 'container mt-3' >
        <h1>Register</h1>

        <div className='mb-3'>
          <label htmlFor='first_name' className='form-label'>
            First Name 
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='first_name'
            name='first_name'
            value={values.first_name}
            placeholder='first name'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='last_name' className='form-label'>
            Last Name 
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='last_name'
            name='last_name'
            value={values.last_name}
            placeholder='last name'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone Number
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='tel'
            className='form-control'
            id='phone'
            name='phone'
            value={values.phone}
            placeholder='phone number'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address 
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='address'
            name='address'
            value={values.address}
            placeholder='address'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username 
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            className='form-control'
            id='username'
            name='username'
            value={values.username}
            placeholder='username'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='password'
            required
          />
        </div>

        <div style = {{color:"red", margin : "10px 0"}}>{error}</div>
        <div style = {{color:"green", margin : "10px 0"}}>{success}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}

export default Register