import React from 'react'
import Layout from '../components/layout'
import {useState} from 'react'
import { onLogin } from '../api/auth'
import {useDispatch} from 'react-redux'
import { authenticateUser } from '../redux/slices/authSlice'
 
function Login() {
  const [values,setValues] = useState({
    username:'',
    password:''
  })
  const [error,setError] = useState(false)
//State of value are being changed
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
  //we can use the dispatch to dispatch actions to the store
  const dispatch = useDispatch()
  const onSubmit = async (e) =>{
    e.preventDefault()

    try{
      await onLogin(values)
      dispatch(authenticateUser())
      //The key is isAuth and the value is true
      localStorage.setItem('isAuth', 'true' )
    }catch(error){
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }

  }

  return (
    <Layout>
      <form onSubmit = {(e) => onSubmit(e)} className = 'container mt-3' >
        <h1>Login</h1>


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

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}

export default Login