
import {useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import axios from "axios"
import Events from "./events"
import Login from "./login"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import CreateEvent from "./createEvent"
import {getEvent} from "./redux/eventSlice"
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchData=async()=>{
   try{
    const response=await axios.get("http://localhost:3002");
    dispatch(getEvent(response.data))
   }
   catch(err){
   console.log(err)
   }
    }
   fetchData()
},[])

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Events/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/create" element={<CreateEvent/>}></Route>
      
      </Routes>
      </BrowserRouter>
       
  )
}

export default App
