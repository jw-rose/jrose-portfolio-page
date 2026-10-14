import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { isRateLimited } from '@/lib/rateLimit';

const MAX_BODY_BYTES = 10_000;
const CRLF = /[\r\n]/;

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(body: Record<string, unknown>): {
  errors: ValidationErrors;
  name: string;
  email: string;
  message: string;
} {
  const errors: ValidationErrors = {};

  const rawName = typeof body.name === 'string' ? body.name.trim() : '';
  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

  if (!rawName || rawName.length > 80 || CRLF.test(rawName)) {
    errors.name = 'Enter your name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!rawEmail || rawEmail.length > 120 || CRLF.test(rawEmail) || !emailRegex.test(rawEmail)) {
    errors.email = 'Enter a valid email address.';
  }

  if (rawMessage.length < 10 || rawMessage.length > 2000) {
    errors.message = 'Message must be between 10 and 2000 characters.';
  }

  return { errors, name: rawName, email: rawEmail, message: rawMessage };
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // not all same-origin requests send Origin

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();

  if (!isSameOrigin(request)) {
    console.warn(`[contact] ${requestId} rejected: cross-origin`);
    return NextResponse.json({ error: 'Request rejected.' }, { status: 403 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    console.warn(`[contact] ${requestId} rejected: body too large`);
    return NextResponse.json({ error: 'Request body too large.' }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    console.warn(`[contact] ${requestId} rejected: invalid JSON`);
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Silent success for bots.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    console.log(`[contact] ${requestId} honeypot triggered, silent success`);
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const key = clientKey(request);
  if (isRateLimited(key)) {
    console.warn(`[contact] ${requestId} rate limited`);
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const { errors, name, email, message } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

  if (!toEmail) {
    console.error(`[contact] ${requestId} misconfigured: CONTACT_TO_EMAIL unset`);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: 'New message from devjrose.com',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>New contact form message</h2>
              <p><strong>From:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p style="white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[contact] ${requestId} sent ok`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    console.error(`[contact] ${requestId} send failed`);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
