type DataLayerEvent = {
  event: string;
  ecommerce: Record<string, any>;
  event_id?: string;
  user_data?: Record<string, any>;
};

type GAdsItem = {
  id: string | number;
  google_business_vertical: 'retail';
};

type GAdsEvent = {
  event: 'GAds_view_item' | 'GAds_add_to_cart' | 'GAds_purchase' | 'GAds_view_search_results' | 'GAds_view_item_list';
  value: number;
  items: GAdsItem[];
};

export const pushDataLayerEvent = (eventData: DataLayerEvent): void => {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push(eventData);
  }
};

// Google Ads Dynamic Remarketing
export const pushGAdsEvent = (eventData: GAdsEvent): void => {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    // temporary disable because it is new and not supported
    // more info here https://docs.google.com/document/d/1VpsH32hYuPAI6adh0EuOmw9hgLfn_X0HgUL2F4afhDo/edit?tab=t.0#heading=h.im35brsz1201
    // window.dataLayer.push(eventData);
  }
};

type MeasurementsPost = {
  name: string;
  params: Record<string, any>;
  client_id?: string | null;
};

const measurementId = 'G-6DRBNRFYC9';
const apiSecret = '<a2f8_9KgTVeRWPPiU_XmBg>';

export const measurementsPost = (eventData: MeasurementsPost): void => {
  if (!measurementId || !apiSecret) return;

  const { name, params, client_id } = eventData;
  fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: 'POST',
    body: JSON.stringify({
      client_id,
      events: [{
        name,
        params,
      }],
    }),
  }).catch(() => {});
};
