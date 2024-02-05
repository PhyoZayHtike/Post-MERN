import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import Create from './pages/Create'
import Login from './pages/Login'
import Register from './pages/Register'
import { useCookies } from 'react-cookie'
import Edit from './pages/Edit'
import Comment from './pages/Comment'
import DeletePost from './pages/DeletePost'
import YourPost from './pages/YourPost'

function App() {
  const [cookies,setCookies] = useCookies(["access_token"])
  return (
    <>
    <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post' element={!cookies.access_token ? <Navigate to={'/'} /> : <YourPost/>}/>
        <Route path='/create' element={!cookies.access_token ? <Navigate to={'/'} /> : <Create/>}/>
        <Route path='/edit/:id' element={!cookies.access_token ? <Navigate to={'/'} /> : <Edit/>}/>
        <Route path='/delete/:id' element={!cookies.access_token ? <Navigate to={'/'} /> : <DeletePost/>}/>
        <Route path='/comment/:id' element={<Comment/>}/>
        <Route path='/login' element={cookies.access_token ? <Navigate to={'/'} /> : <Login/>}/>
        <Route path='/register' element={cookies.access_token ? <Navigate to={'/'} /> : <Register/>}/>
      </Routes>
    </>
  )
}

export default App
