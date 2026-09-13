import { supabaseAdmin } from '~/lib/supabase'
import { sendEmailViaWeb3Forms } from '~/lib/web3forms'

export type Inquiry = {
  full_name: string
  email?: string
  phone: string
  company?: string
  service: string
  budget?: string
  message: string
}

function validate(data: Inquiry) {
  const missing: string[] = []
  if (!data.full_name?.trim()) missing.push('full name')
  if (!data.phone?.trim()) missing.push('phone')
  if (!data.service?.trim()) missing.push('service')
  if (!data.message?.trim()) missing.push('project details')
  if (missing.length) throw new Error(`Please fill in: ${missing.join(', ')}.`)
  if (data.email?.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    throw new Error('That email address looks incomplete.')
  }
}

/**
 * Stores a project inquiry in Supabase and sends email via Web3Forms.
 */
export async function submitInquiry(data: Inquiry) {
  validate(data)
  const db = supabaseAdmin()
  if (!db) {
    throw new Error('Supabase is not configured yet — add the env vars from .env.example.')
  }
  
  // Insert into database
  const { error } = await db.from('project_inquiries').insert({
    full_name: data.full_name.trim(),
    email: data.email?.trim() || null,
    phone: data.phone.trim(),
    company: data.company?.trim() || null,
    service: data.service,
    budget: data.budget || null,
    message: data.message.trim(),
  })
  
  if (error) throw new Error(error.message)
  
  // Send email via Web3Forms
  try {
    await sendEmailViaWeb3Forms({
      full_name: data.full_name.trim(),
      email: data.email?.trim(),
      phone: data.phone.trim(),
      company: data.company?.trim(),
      service: data.service,
      budget: data.budget,
      message: data.message.trim(),
      form_type: 'inquiry',
    })
  } catch (emailError) {
    console.error('Failed to send email via Web3Forms:', emailError)
    // Don't throw error here - inquiry was saved to DB successfully
    // Email sending is secondary
  }
  
  return { ok: true as const }
}
