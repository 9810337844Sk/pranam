import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Marquee } from './components/Marquee'

// Import page components
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Process from './pages/Process'
import Team from './pages/Team'
import Contact from './pages/Contact'

// Admin panel
import AdminLogin from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import { ProtectedRoute } from './admin/ProtectedRoute'
import AdminEnquiries from './admin/Enquiries'
import AdminHeroSlider from './admin/HeroSlider'
import AdminServices from './admin/Services'
import AdminProducts from './admin/Products'
import AdminTeam from './admin/Team'
import AdminProcess from './admin/Process'
import AdminTestimonials from './admin/Testimonials'
import AdminCompanyInfo from './admin/CompanyInfo'
import { Navigate } from 'react-router-dom'

function SiteChrome() {
  return (
    <>
      <Marquee />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/process" element={<Process />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/enquiries" replace />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="hero-slider" element={<AdminHeroSlider />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="process" element={<AdminProcess />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="company" element={<AdminCompanyInfo />} />
        </Route>
      </Route>
      <Route path="/*" element={<SiteChrome />} />
    </Routes>
  )
}

export default App