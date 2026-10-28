import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ContentWrapper } from './components/ContentWrapper'
import { SettingsPanel } from './components/SettingsPanel'
import { SettingsProvider } from './context/SettingsContext'
import { LigeNuPage } from './pages/LigeNuPage'
import { OversigtPage } from './pages/OversigtPage'
import { HistorikPage } from './pages/HistorikPage'


function App() {
  return (
    <SettingsProvider>

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Nav />

        <ContentWrapper>
          <Routes>
            <Route path="/" element={<LigeNuPage />} />
            <Route path="/oversigt" element={<OversigtPage />} />
            <Route path="/historik" element={<HistorikPage />} />

          </Routes>
        </ContentWrapper>

        <Footer />

       
        <SettingsPanel />
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
