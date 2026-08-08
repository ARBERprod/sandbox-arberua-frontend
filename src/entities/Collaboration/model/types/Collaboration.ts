/**
 * Backend ships three different shapes of the same entity, one per resource — they are kept
 * apart on purpose: an optional-field union would let a list item silently read as a detail one.
 */

/** Embedded into every product card (`ShortProductResource`), never carries images. */
export interface ProductCollaboration {
  id: string;
  title: string;
  // Ready-to-render string from the admin panel (≤25 chars), not assembled on the client.
  // Optional there: `null` means this collaboration shows no sticker at all.
  label: string | null;
  url: string;
}

/** Item of `GET /v2/collaborations` — the menu list. */
export interface Collaboration {
  id: string;
  title: string;
  label: string | null;
  url: string;
  logo: string | null;
}

/** `GET /v2/collaborations/{id}` — the section page. All images are nullable by contract. */
export interface CollaborationDetails extends Collaboration {
  description: string | null;
  banner_horizontal: string | null;
  banner_vertical: string | null;
}
