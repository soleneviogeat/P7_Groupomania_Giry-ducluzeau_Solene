import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Post from './pages/Post'
import Header from './components/Header'
import GlobalStyle from './utils/GlobalStyle'
import { ThemeProvider } from './utils/ColorContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/post" element={<Post/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
             
          </Routes>
          
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

