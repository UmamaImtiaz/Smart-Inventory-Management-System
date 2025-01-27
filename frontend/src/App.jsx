import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const[items ,setItems] = useState([])
  useEffect(() =>{
    const fetchData = async () => {
      const res = await fetch('http://localhost:5173')
      const data = await res.json()
      setItems(data.items)

    }
    fetchData();
  },[])

  return (
 <>

 {items.map(i => (
  <p>{i.name},{i.email}</p>
 ))}
 </>
  )
}

export default App
