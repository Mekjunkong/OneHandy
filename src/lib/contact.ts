const rawWhatsAppNumber = process.env.NEXT_PUBLIC_ONEHANDY_WHATSAPP_NUMBER?.trim() || '';

const normalizedWhatsAppNumber = rawWhatsAppNumber.replace(/[^0-9]/g, '');

export const contact = {
  whatsappNumber: normalizedWhatsAppNumber || null,
  whatsappUrl: normalizedWhatsAppNumber ? `https://wa.me/${normalizedWhatsAppNumber}` : null,
  whatsappLabel: normalizedWhatsAppNumber ? 'Message us on WhatsApp' : 'Submit a request and we will follow up',
  followUpCopy:
    'Submit a request and our team will follow up to confirm technician availability, timing, and next steps.',
} as const;
