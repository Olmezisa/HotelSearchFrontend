const API_BASE_URL = 'http://localhost:8080/api/v1';
const API_ROOT_BASE_URL = 'http://localhost:8080';

export const api = {
  getArrivalAutocomplete: (query) => fetch(`${API_BASE_URL}/locations/autocomplete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then(res => res.json()),

  getNationalities: () => fetch(`${API_BASE_URL}/lookups/nationalities`).then(res => res.json()),

  getCurrencies: () => fetch(`${API_BASE_URL}/lookups/currencies`).then(res => res.json()),

  getProductInfo: (productId, provider) => fetch(`${API_BASE_URL}/products/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId, provider: String(provider) }),
  }).then(res => res.json()),

  searchByLocation: (requestBody) => fetch(`${API_ROOT_BASE_URL}/api/price-search/by-location`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }).then(res => res.json()),

  searchByHotel: (requestBody) => fetch(`${API_ROOT_BASE_URL}/api/price-search/by-hotel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }).then(res => res.json()),

  getOffers: (params) => {
    const url = `${API_ROOT_BASE_URL}/api/gateway/get-offers`;
    return fetch(url, {
      method: 'POST', // Metot POST olarak değiştirildi.
      headers: { 'Content-Type': 'application/json' }, // Content-Type başlığı eklendi.
      body: JSON.stringify(params), // Parametreler body içinde JSON olarak gönderiliyor.
    }).then(res => res.json());
  },
  getOfferDetails: (offerIds, currency) => {
    const url = `${API_ROOT_BASE_URL}/api/gateway/get-offer-details`;
    const requestBody = {
      offerIds: offerIds,
      currency: currency,
      getProductInfo: true // Backend'deki DTO'ya uygun
    };
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    }).then(res => res.json());
  },

  /*burada son endpointi ekledim*/
  beginTransaction: (payload) => {
    return fetch(`${API_ROOT_BASE_URL}/api/booking/begin-transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(res => {
      if (!res.ok) throw new Error('Begin transaction API hatası');
      return res.json();
    });
  },

  setReservationInfo: async (setInfoPayload) => {
    const res = await fetch(`${API_ROOT_BASE_URL}/api/booking/set-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(setInfoPayload),
    });
    if (!res.ok) throw new Error('Set Reservation Info API error');
    return await res.json();
  },

  commitTransaction : async (transactionId) => {
    const res = await fetch(`${API_ROOT_BASE_URL}/api/booking/commit-transaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionId),
    });
    if (!res.ok) throw new Error('Commit Transaction API error');
    return await res.json();
  },

  getReservationDetail : async (reservationNumber) => {
    try {
      const response = await fetch(`${API_ROOT_BASE_URL}/api/booking/get-detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ReservationNumber: reservationNumber }), 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen API hatası' }));
        throw new Error(errorData.message || `API Hatası: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get Reservation Detail API çağrısı hatası:", error);
      throw error;
    }
  }
};

