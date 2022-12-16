import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Dashboard = () => {
  //we can use the dispatch to dispatch actions to the store
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)


  const logout = async () => {
    try {
      //sends logout request to the server
      //will clear the token from the cookie
      await onLogout()
      //will set the is auth to false
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)
      //set the state to false when  the Protected data has been fetched
      setLoading(false)
    } catch (error) {
      logout()
    }
  }
  // useeffect so that everytime the page is loaded, the page will be run only one time.  
  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>

        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
      </Layout>
    </div>
  )
}

export default Dashboard