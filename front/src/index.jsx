import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.page'
import Presentation from './pages/Presentation.page'
import Services from './pages/Services.page'
import Pictures from './pages/Pictures.page'
import Contact from './pages/Contact.page'
import Events from './pages/Events.page'
import Brunch from './pages/Brunch.page'
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
            <Route path="/presentation" element={<Presentation/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/pictures" element={<Pictures/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/brunch" element={<Brunch/>} />
            <Route path="/admin" element={<Admin/>}/>
          </Routes>
          <Footer></Footer>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

