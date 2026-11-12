const FALLBACK_PHONE = '8828422213'

/**
 * Normalize any phone string to a 10-digit Indian mobile number.
 */
export function normalizeTenDigitPhone(phone, fallback = FALLBACK_PHONE) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length === 10) return digits
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length > 10) {
    const last10 = digits.slice(-10)
    if (last10.length === 10) return last10
  }
  return fallback
}

export function telHref(phone, fallback = FALLBACK_PHONE) {
  return `tel:${normalizeTenDigitPhone(phone, fallback)}`
}

/**
 * Build a WhatsApp chat URL: https://wa.me/91XXXXXXXXXX
 */
export function whatsappHref(phone, message, fallback = FALLBACK_PHONE) {
  const ten = normalizeTenDigitPhone(phone, fallback)
  const base = `https://wa.me/91${ten}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export { FALLBACK_PHONE }
