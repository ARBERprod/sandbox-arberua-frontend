export function dlPush(payload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
}
