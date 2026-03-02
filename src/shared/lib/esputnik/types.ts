// eSputnik API types

export interface EsputnikChannel {
  type: 'email' | 'sms';
  value: string;
}

export interface EsputnikField {
  id: number;
  value: string;
}

export interface EsputnikContact {
  channels: EsputnikChannel[];
  firstName?: string;
  lastName?: string;
  fields?: EsputnikField[];
}

// POST /api/v1/contact/subscribe
export interface SubscribeContactRequest {
  contact: EsputnikContact;
  groups?: string[];
  formType?: string;
}

// POST /api/v1/contacts
export interface AddUpdateContactsRequest {
  contacts: EsputnikContact[];
  dedupeOn: 'email' | 'sms';
  customFieldsIDs?: number[];
  groupNames?: string[];
  groupNamesExclude?: string[];
}

// POST /api/v3/event
export interface GenerateEventRequest {
  eventKey: string;
  contactId?: number;
  email?: string;
  phone?: string;
  externalCustomerId?: string;
  eventData?: Record<string, string>;
  eventDate?: string;
}

// Internal API route request types (frontend -> Next.js API routes)
export interface EsputnikSubscribePayload {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
  lang?: string;
  source?: string;
  registrationAt?: string;
  birthday?: string;
  groups?: string[];
  formType?: string;
}

export interface EsputnikUpdateContactPayload {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
  lang?: string;
  fields?: EsputnikField[];
  groupNames?: string[];
  groupNamesExclude?: string[];
}

export interface EsputnikEventPayload {
  eventKey: string;
  email?: string;
  phone?: string;
  externalCustomerId?: string;
  eventData?: Record<string, string>;
}

// Order item for eSputnik events
export interface EsputnikOrderItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
  image_url?: string;
  product_url?: string;
}

// Cart item for eSputnik events
export interface EsputnikCartItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
  image_url?: string;
  product_url?: string;
}
