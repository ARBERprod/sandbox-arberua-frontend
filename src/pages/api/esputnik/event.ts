/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { EsputnikEventPayload, GenerateEventRequest } from '@/shared/lib/esputnik/types';

const ESPUTNIK_API_URL = process.env.ESPUTNIK_API_URL || 'https://esputnik.com/api';
const ESPUTNIK_API_KEY = process.env.ESPUTNIK_API_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!ESPUTNIK_API_KEY) {
    console.error('[eSputnik] API key is not configured');
    return res.status(500).json({ error: 'eSputnik API key is not configured' });
  }

  const payload: EsputnikEventPayload = req.body;

  if (!payload.eventKey) {
    return res.status(400).json({ error: 'eventKey is required' });
  }

  if (!payload.email && !payload.phone && !payload.externalCustomerId) {
    return res.status(400).json({ error: 'At least one contact identifier (email, phone, or externalCustomerId) is required' });
  }

  const body: GenerateEventRequest = {
    eventKey: payload.eventKey,
    ...(payload.email && { email: payload.email }),
    ...(payload.phone && { phone: payload.phone }),
    ...(payload.externalCustomerId && { externalCustomerId: payload.externalCustomerId }),
    ...(payload.eventData && { eventData: payload.eventData }),
    eventDate: new Date().toISOString(),
  };

  try {
    const credentials = Buffer.from(`api:${ESPUTNIK_API_KEY}`).toString('base64');
    const response = await fetch(`${ESPUTNIK_API_URL}/v3/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[eSputnik] Event send failed:', response.status, errorText);
      return res.status(response.status).json({ error: 'eSputnik API error', details: errorText });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[eSputnik] Event request failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
