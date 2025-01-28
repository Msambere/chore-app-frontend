import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'


const VITE_APP_BACKEND_URL : string = import.meta.env.VITE_APP_BACKEND_URL

const getTestString= (): Promise<string> => {
    return axios.get(`${VITE_APP_BACKEND_URL}`)
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
};

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getTestString().then((message ) => {
      setMessage(message);
  })
}, []);

  return (
    <>
      <h1> Testing Connection</h1>
        <h1>{message}</h1>

    </>
  )
}

export default App
