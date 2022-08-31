import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
/*import Survey from './pages/Survey'
import Results from './pages/Results'
import Freelances from './pages/Freelances'*/
import Post from './pages/Post'
import Header from './components/Header'
import Footer from './components/Footer'
/*import Error from './components/Error'*/
import GlobalStyle from './utils/GlobalStyle'
import { ThemeProvider, SurveyProvider } from './utils/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/post/:id" render={(props) => <Post {...props} />}/>
             
          </Routes>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

/*<Route path="/survey/:questionNumber" element={<Survey/>} />
            <Route path="/results" element={<Results/>} />
            <Route path="/freelances" element={<Freelances/>} />
            <Route path="*" element={<Error/>} />*/