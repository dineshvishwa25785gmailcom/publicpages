const BASE = import.meta.env.VITE_API_BASE_URL || 'https://codexclear.com'

/**
 * POST contact form data to .NET Core API.
 * Expects:  POST /api/contact/send  { name, email, phone, company, service, message }
 * Returns:  { success, message }
 */
export async function sendContactForm(data) {
  const res = await fetch(`${BASE}/api/contact/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name:    data.name?.trim(),
      email:   data.email?.trim().toLowerCase(),
      phone:   data.phone?.trim() || null,
      company: data.company?.trim() || null,
      service: data.service || null,
      message: data.message?.trim(),
    }),
  })

  if (!res.ok) {
    let msg = `Server error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || d?.errorMessage || msg } catch (_) {}
    throw new Error(msg)
  }

  try {
    const d = await res.json()
    return { success: true, message: d?.message || 'Message sent successfully!' }
  } catch (_) {
    return { success: true, message: 'Message sent successfully!' }
  }
}

/** POST email to newsletter endpoint */
export async function subscribeNewsletter(email) {
  const res = await fetch(`${BASE}/api/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  })
  if (!res.ok) {
    let msg = `Error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || msg } catch (_) {}
    throw new Error(msg)
  }
  try { const d = await res.json(); return d?.message || 'Subscribed!' } catch (_) { return 'Subscribed!' }
}
