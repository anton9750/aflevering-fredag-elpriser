import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { ContentWrapper } from './components/ContentWrapper'
import { SettingsPanel } from './components/SettingsPanel'
import { SettingsProvider, useSettings } from './context/SettingsContext'
import { LigeNuPage } from './pages/LigeNuPage'
import { OversigtPage } from './pages/OversigtPage'
import { HistorikPage } from './pages/HistorikPage'
import { useElpriser } from './hooks/useElpriser'
import { useLavesteprisNotifikation } from './hooks/useLavesteprisNotifikation'


function App() {
  return (
    <SettingsProvider>

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LavesteprisVagt />

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

// Holder øje med dagens priser :))
function LavesteprisVagt() {
  const { region, visMedMoms, lavesteprisAlarm } = useSettings()
  const { priser } = useElpriser(new Date(), region)

  useLavesteprisNotifikation(lavesteprisAlarm, priser, visMedMoms)

  return null
}

export default App
