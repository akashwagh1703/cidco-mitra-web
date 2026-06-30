const LEAD_FORM_CONVERSION = 'AW-18031354675/_0c0COvhhb4cELPGgpZD'

export function trackLeadFormConversion() {
  if (!import.meta.env.PROD) return

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: LEAD_FORM_CONVERSION })
  }
}
