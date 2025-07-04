type DataLayerEvent = {
  event: string;
  ecommerce: Record<string, any>;
  event_id?: string;
  user_data?: Record<string, any>;
};

export const pushDataLayerEvent = (eventData: DataLayerEvent): void => {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push(eventData);
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
  });
};
