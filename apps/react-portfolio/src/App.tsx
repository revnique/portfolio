import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from './HomePage/HomePage'
import BuckLitePage from './BuckLite/BuckLitePage'
import ComponentsPage from './ComponentsPage/ComponentsPage'
import { EventsCalendar } from './EventsCalendar/EventsCalendar'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/bucklite" element={<BuckLitePage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/events" element={<EventsCalendar />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
