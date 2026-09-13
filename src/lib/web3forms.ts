/**
 * Web3Forms Email Integration
 * API Key: 7bf42cf0-131f-415a-b192-b6f072bd3f9b
 * 
 * This module handles sending emails via Web3Forms API
 * when forms are submitted on the website
 */

const WEB3FORMS_API_KEY = '7bf42cf0-131f-415a-b192-b6f072bd3f9b'
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export interface EmailData {
  full_name: string
  email?: string
  phone: string
  company?: string
  service: string
  budget?: string
  message: string
  form_type?: 'contact' | 'booking' | 'inquiry'
}

/**
 * Send email via Web3Forms
 */
export async function sendEmailViaWeb3Forms(data: EmailData) {
  try {
    const formData = new FormData()

    // Web3Forms requires these fields
    formData.append('access_key', WEB3FORMS_API_KEY)
    formData.append('subject', generateSubject(data))
    formData.append('from_name', data.full_name)
    formData.append('from_email', data.email || 'noreply@pranamsoftware.com.np')
    
    // Email content
    formData.append('message', generateEmailBody(data))
    
    // Redirect after submission (optional)
    formData.append('redirect', window.location.href)

    // Send to Web3Forms
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Web3Forms error:', result)
      throw new Error(result.message || 'Failed to send email')
    }

    return {
      success: true,
      message: 'Email sent successfully!',
      data: result,
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

/**
 * Generate email subject based on form type
 */
function generateSubject(data: EmailData): string {
  const formType = data.form_type || 'contact'
  
  switch (formType) {
    case 'booking':
      return `New Booking Request: ${data.service}`
    case 'inquiry':
      return `New Inquiry: ${data.service}`
    default:
      return `New Contact Form Submission from ${data.full_name}`
  }
}

/**
 * Generate formatted email body
 */
function generateEmailBody(data: EmailData): string {
  const formType = data.form_type || 'contact'
  
  let body = `
WEBSITE SUBMISSION - ${formType.toUpperCase()}
=====================================

From: ${data.full_name}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone}
Company: ${data.company || 'Not provided'}

Service: ${data.service}
Budget: ${data.budget || 'Not specified'}

Message:
${data.message}

=====================================
Submitted via: Pranam Software Website
Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}
`

  return body.trim()
}

/**
 * Send booking confirmation email
 */
export async function sendBookingEmail(data: EmailData) {
  return sendEmailViaWeb3Forms({
    ...data,
    form_type: 'booking',
    subject: `Service Booking: ${data.service}`,
  })
}

/**
 * Send inquiry confirmation email
 */
export async function sendInquiryEmail(data: EmailData) {
  return sendEmailViaWeb3Forms({
    ...data,
    form_type: 'inquiry',
  })
}
