'use server'

import { prisma } from "@/lib/prisma"

export async function createLead(formData: FormData) {
  const name = formData.get('name') as string
  const businessName = formData.get('businessName') as string
  const contact = formData.get('contact') as string
  const message = formData.get('message') as string

  if (!name || !contact || !message) {
    return { error: 'Please fill in all required fields' }
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        businessName,
        contact,
        message,
      },
    })
    return { success: true, lead }
  } catch (error) {
    console.error('Failed to create lead:', error)
    return { error: 'Failed to submit form. Please try again.' }
  }
}
