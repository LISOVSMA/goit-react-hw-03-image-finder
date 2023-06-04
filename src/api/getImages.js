import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35542467-e178fad6fcbc032b2bfc96ff5';

// export const getImages = async ({ searchQuery, page }) => {
//   const params = new URLSearchParams({
//     key: API_KEY,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     page: page,
//     per_page: 12,
//   });

//   const response = await fetch(`${BASE_URL}?${params}`);

//   if (!response.ok) {
//     throw new Error('Smth went wrong');
//   }

//   return response.json();
// };

export async function getImages(searchQuery, page) {
  const options = {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const response = await axios.get(BASE_URL, options);
  return response;
}
