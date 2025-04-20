import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import SignupPage from './components/SignupPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import ProfilePage from './components/ProfilePage.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: "",
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path: '/signup',
        element: <SignupPage/>
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/settings',
        element: <SettingsPage/>
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      }
    ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
