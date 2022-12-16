import {BrowserRouter,Navigate, Routes, Route, Outlet, Router} from 'react-router-dom'
//Outlet should be used in parent route element to render their child route elements
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { useSelector } from 'react-redux'

//This is a private Route check the authentication
const PrivateRoutes = () => {
  //By using useselector, wer can access the authstate from the aithlice.js with redux
  const {isAuth} = useSelector(state => state.auth)
 // IF is auth, going to return outlet , else naviage to /login
  return <> {isAuth ? <Outlet/> : <Navigate to = '/login'/>} </>
}

const RestrictedRoutes = () => {
  const {isAuth} = useSelector(state => state.auth)
  // If the user is not authenticatred we are going to show component , otherwiser we will go to dashboard
  return <>{!isAuth ? <Outlet/> : <Navigate to = '/dashboard'/>}</>
}

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Home/>} />
      {/*Our private*/}
      <Route element = {<PrivateRoutes/>}>
        <Route path = '/dashboard' element ={<Dashboard/>}></Route>
      </Route>
      {/* If the user is not auth, we are going to stay in the register/login page */}
      <Route element = {<RestrictedRoutes/>}>
        <Route path = '/register' element ={<Register/>}></Route>
        <Route path = '/login' element ={<Login/>}></Route>
      </Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App