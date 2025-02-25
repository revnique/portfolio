import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './HomePage/HomePage'
import BuckLite from './BuckLite/BuckLite'
import ComponentsPage from './ComponentsPage/ComponentsPage'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/bucklite" element={<BuckLite />} />
        <Route path="/components" element={<ComponentsPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
