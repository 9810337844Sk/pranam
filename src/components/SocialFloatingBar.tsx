import { Facebook, Instagram, LinkedIn, YouTube, GoogleG, WhatsApp } from './Icons'
import { useEffect } from 'react'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  brandColor: string
  isImage?: boolean
}

export function SocialFloatingBar() {
  useEffect(() => {
    // Ensure the bar stays fixed by checking parent containers
    const bar = document.querySelector('.social-floating-bar') as HTMLElement
    if (bar) {
      bar.style.position = 'fixed'
      bar.style.zIndex = '100'
    }
  }, [])

  const socialLinks: SocialLink[] = [
    {
      name: 'YouTube',
      icon: <YouTube />,
      url: 'https://www.youtube.com/@pranamsoftware',
      brandColor: '#FF0000',
    },
    {
      name: 'Facebook',
      icon: <Facebook />,
      url: 'https://www.facebook.com/pranamsoftware',
      brandColor: '#1877F2',
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      url: 'https://www.instagram.com/pranamsoftware',
      brandColor: '#E4405F',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      url: 'https://www.linkedin.com/in/pranam-software-950111421/',
      brandColor: '#0A66C2',
    },
    {
      name: 'Google',
      icon: <GoogleG />,
      url: 'https://www.pranamsoftware.com.np/',
      brandColor: '#4285F4',
    },
    {
      name: 'TikTok',
      icon: <img src="/icons/pinterst icon.png" alt="TikTok" style={{ width: '24px', height: '24px' }} />,
      url: 'https://www.tiktok.com/404?fromUrl=/pranamsoftware',
      brandColor: '#000000',
      isImage: true,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsApp />,
      url: 'https://wa.me/9779823415625',
      brandColor: '#25D366',
    },
  ]

  return (
    <div className="social-floating-bar">
      <div className="social-bar-divider"></div>
      <nav className="social-bar-nav">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-bar-icon ${social.isImage ? 'social-bar-icon-img' : ''}`}
            aria-label={social.name}
            data-brand-color={social.brandColor}
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </nav>
      <div className="social-bar-divider"></div>
      <div className="social-bar-label">SHARE</div>
    </div>
  )
}
