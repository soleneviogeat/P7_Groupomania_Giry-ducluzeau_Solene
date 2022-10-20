import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Connexion.page'
import Login from './pages/Login.page'
import Signup from './pages/Signup.page'
import Post from './pages/Post.page'
import Admin from './pages/Admin.page'
import Footer from './components/Footer'
import GlobalStyle from './utils/GlobalStyle'
import { ThemeProvider } from './utils/ColorContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import './styles/App.scss'

library.add(fas, faTwitter, faFontAwesome)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/post" element={<Post/>}/>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
          <Footer></Footer>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

