import { Route, Routes } from 'react-router-dom'
import './App.css'
import SurveyForm from './pages/survey-form'
import Thankyou from './pages/thankyou'

function App() {
  return (
    
      <div className='w-screen h-screen overflow-hidden flex items-center justify-center'>
        <Routes>
          <Route path='*' element={<SurveyForm/>}/>
          <Route path='thankyou' element={<Thankyou/>}/>
        </Routes>
      </div>
    
  )
}

export default App
