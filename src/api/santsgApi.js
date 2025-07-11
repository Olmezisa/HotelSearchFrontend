
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

  priceSearch: (searchParams) => fetch(`${API_BASE_URL}/search/prices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchParams),
  }).then(res => res.json()),

  getProductInfo: (productId) => fetch(`${API_BASE_URL}/products/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId }),
  }).then(res => res.json()),
  searchByLocation: (requestBody) => fetch(`${API_ROOT_BASE_URL}/api/price-search/by-location`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }).then(res => res.json()),

  /**
   * Otele göre fiyat araması yapar.
   * @param {object} requestBody - PriceSearchByHotelRequest ile uyumlu nesne.
   */
  searchByHotel: (requestBody) => fetch(`${API_ROOT_BASE_URL}/api/price-search/by-hotel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }).then(res => res.json()),
};