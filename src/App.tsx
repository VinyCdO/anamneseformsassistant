import './App.css'
import AppRoutes from './routes/index.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter basename='/'>
      <AppRoutes />      
    </BrowserRouter>
  )
}

export default App
