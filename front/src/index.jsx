import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
/*import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'*/
import Post from './pages/Post'
import Header from './components/Header'

/*import Error from './components/Error'*/
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

/*<Route path="/survey/:questionNumber" element={<Survey/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/freelances" element={<Freelances/>} />
            <Route path="/profile/:id" render={(props) => <Profile {...props} />}/>
            <Route path="*" element={<Error/>} />*/