import '@mantine/core/styles.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import MainPage from './pages/MainPage/MainPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';


function App() {
  return (
    <MantineProvider defaultColorScheme='dark'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/:id' element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
