import {Home} from './pages/Home'
import { Landing } from './pages/Landing'
import { Explore } from './pages/Explore'
import  Create  from './pages/Create'
import { Route,BrowserRouter,Routes } from 'react-router-dom'
function App() {
  

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={ <Landing/>}/>
      <Route path='/home' element={ <Home/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path="/create/:id" element={<Create />} />
      
      

    </Routes>
    </BrowserRouter>
  
    
  )
}

export default App
