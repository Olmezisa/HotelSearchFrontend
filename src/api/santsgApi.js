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
};