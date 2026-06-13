import {error, json} from '@sveltejs/kit'
import {PRIVATE_CF_SECRET, PRIVATE_EMAIL_SECRET, PRIVATE_TS} from '$env/static/private'
import type {RequestHandler} from './$types'

export const POST: RequestHandler = async ({request, getClientAddress}) => {
  const body = await request.json()

  if (typeof body !== 'object' || body === null) {
    error(400, 'Invalid request body')
  }

  const {email, message, name, token} = body as Record<string, unknown>
  if (!token || !name || !email || !message) {
    error(400, 'Invalid request body')
  }

  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({secret: PRIVATE_CF_SECRET, response: token, remoteip: getClientAddress()})
  })

  const result: {success: boolean} = await verify.json()
  if (!result?.success) {
    error(403, 'Invalid token')
  }

  const res = await fetch(PRIVATE_TS, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, message, secretKey: PRIVATE_EMAIL_SECRET})
  })

  if (!res.ok) {
    error(502, 'Failed to send message')
  }

  return json({success: true})
}
