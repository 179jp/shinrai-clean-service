import type { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const TO = 'y+sc@179.jp';
const FROM = 'SHINRAI CLEAN SERVICE <contact@bot-shinrai-clean-service.179.jp>';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data: Record<string, string | string[]>;
  try {
    data = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const rows = Object.entries(data)
    .map(([key, value]) => {
      const val = Array.isArray(value) ? value.join('、') : value;
      return `<tr><th style="text-align:left;padding:8px 12px;background:#f5f5f5;white-space:nowrap;font-weight:600;border-bottom:1px solid #e5e5e5">${key}</th><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5">${val}</td></tr>`;
    })
    .join('');

  const html = `
    <h2 style="font-family:sans-serif">お問い合わせが届きました</h2>
    <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:560px">
      ${rows}
    </table>
  `;

  const subject = `【お問い合わせ】${data['お名前'] ?? ''}さんからのメッセージ`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
