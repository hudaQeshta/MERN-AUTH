import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import AuthedRoute from './containers/AuthedRoute'
import './assets/styles/styles.css'

function App() {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage:
            'linear-gradient( 95.2deg, rgba(173,252,234,1) 26.8%, rgba(192,229,246,1) 64% )',
          height: '100vh',
        }}
      >
        <Container>
          <Routes>
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/*' element={<NotFoundPage />} />
            <Route path='/' element={<AuthedRoute />}>
              <Route path='/' element={<ProfilePage />} />
            </Route>
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App
