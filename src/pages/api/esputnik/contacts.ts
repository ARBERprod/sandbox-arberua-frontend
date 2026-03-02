/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { EsputnikUpdateContactPayload, AddUpdateContactsRequest, EsputnikField } from '@/shared/lib/esputnik/types';
import { ESPUTNIK_FIELD_IDS } from '@/shared/lib/esputnik/constants';

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

  const payload: EsputnikUpdateContactPayload = req.body;

  if (!payload.email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const fields: EsputnikField[] = payload.fields || [];
  const customFieldsIDs: number[] = [];

  if (payload.externalId && ESPUTNIK_FIELD_IDS.EXTERNAL_ID) {
    fields.push({ id: ESPUTNIK_FIELD_IDS.EXTERNAL_ID, value: payload.externalId });
    customFieldsIDs.push(ESPUTNIK_FIELD_IDS.EXTERNAL_ID);
  }
  if (payload.lang && ESPUTNIK_FIELD_IDS.LANG) {
    fields.push({ id: ESPUTNIK_FIELD_IDS.LANG, value: payload.lang });
    customFieldsIDs.push(ESPUTNIK_FIELD_IDS.LANG);
  }

  const body: AddUpdateContactsRequest = {
    contacts: [
      {
        channels: [
          { type: 'email', value: payload.email },
          ...(payload.phone ? [{ type: 'sms' as const, value: payload.phone }] : []),
        ],
        ...(payload.firstName && { firstName: payload.firstName }),
        ...(payload.lastName && { lastName: payload.lastName }),
        ...(fields.length > 0 && { fields }),
      },
    ],
    dedupeOn: 'email',
    ...(customFieldsIDs.length > 0 && { customFieldsIDs }),
    ...(payload.groupNames && { groupNames: payload.groupNames }),
    ...(payload.groupNamesExclude && { groupNamesExclude: payload.groupNamesExclude }),
  };

  try {
    const credentials = Buffer.from(`api:${ESPUTNIK_API_KEY}`).toString('base64');
    const response = await fetch(`${ESPUTNIK_API_URL}/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[eSputnik] Contacts update failed:', response.status, errorText);
      return res.status(response.status).json({ error: 'eSputnik API error', details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('[eSputnik] Contacts request failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
