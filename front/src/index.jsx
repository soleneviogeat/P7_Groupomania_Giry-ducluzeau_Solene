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
import CreatePost from './pages/CreatePost'
import Header from './components/Header'
import Footer from './components/Footer'
/*import Error from './components/Error'*/
import GlobalStyle from './utils/GlobalStyle'
import { ThemeProvider } from './utils/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/" element={<Post/>}/>
            <Route path="/" element={<CreatePost/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
             
          </Routes>
          <Footer />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

/*<Route path="/survey/:questionNumber" element={<Survey/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/freelances" element={<Freelances/>} />
            <Route path="/profile/:id" render={(props) => <Profile {...props} />}/>
            <Route path="*" element={<Error/>} />*/