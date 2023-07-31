const BASE_URL = "https://api.thecatapi.com";



const API_KEY = "live_RaX6HSMwfHeCOokp0MabnaZ6ftMgiEPXY1LSSslTb9ANIByFupdCwQecs3T6qJSD";

export const fetchBreeds = () => fetch(
  `${BASE_URL}/v1/breeds`
)
.then((response) => {    
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();      
})

export const fetchCatByBreed = breedId => fetch(
  `${BASE_URL}/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
)
.then((response) => {  
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();      
})

