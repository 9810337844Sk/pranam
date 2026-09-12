import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Marquee } from './components/Marquee'
import { AnalyticsTracker } from './components/AnalyticsTracker'

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
import AdminTestimonials from './admin/Testimonials'
import AdminBrands from './admin/Brands'
import AdminCompanyInfo from './admin/CompanyInfo'
import AdminAnalytics from './admin/Analytics'
import AdminBlog from './admin/Blog'
import { Navigate } from 'react-router-dom'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function SiteChrome() {
  return (
    <>
      <AnalyticsTracker />
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
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
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="hero-slider" element={<AdminHeroSlider />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="brands" element={<AdminBrands />} />
          <Route path="company" element={<AdminCompanyInfo />} />
        </Route>
      </Route>
      <Route path="/*" element={<SiteChrome />} />
    </Routes>
  )
}

export default App