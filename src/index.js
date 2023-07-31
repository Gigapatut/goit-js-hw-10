import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import './loading.css';
import SlimSelect from 'slim-select'

import { Loading } from 'notiflix/build/notiflix-loading-aio';

const pLoader = document.querySelector(".loader");
pLoader.classList.add("loading")
const pError = document.querySelector(".error");
pError.classList.add("loading");


const API_KEY = "live_RaX6HSMwfHeCOokp0MabnaZ6ftMgiEPXY1LSSslTb9ANIByFupdCwQecs3T6qJSD";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
breedSelect.classList.add("loading");


const options = {
  method: 'GET',
  headers: {
    'x--api-key': API_KEY,
  }
};


fetchBreeds()
.then(data => {
  breedSelect.classList.add("loading");
  Loading.standard('Loading data, please wait...');
  pLoader.classList.remove("loading");
  
  const markup = data.map((element) =>   
    `<option value = "${element.id}">${element.name}</option>`)
  .join("");            
  pLoader.classList.add("loading");    

  breedSelect.insertAdjacentHTML("afterbegin", markup);

  // new SlimSelect({
  //   select: breedSelect
  // });

  Loading.remove();  
  breedSelect.classList.remove("loading")
})
.catch(error => {
  pError.classList.remove("loading")
});





function getValue() {
  
  catInfo.classList.add("loading")
  pLoader.classList.remove("loading");
  
  let breedValue = breedSelect.value;
  
  fetchCatByBreed(breedValue).then(data => {
    
    pLoader.classList.add("loading")  

     const markup = data.map((element) => { 
      console.log(data)
       catInfo.innerHTML = "";
       const dataBreed = data[0].breeds[0];
        return (
          `<div class="foto"><img
            class="image"
            src=${data[0].url}
            alt=${dataBreed.alt_names}
          /></div>
          <div class="diskr">
            <h1>${dataBreed.name}</h1>
            <p>${dataBreed.description}</p>
            <h2>Temperament</h2>
            <p>${dataBreed.temperament}</p>
          </div>`
        )
        
      });          
            
    catInfo.insertAdjacentHTML("afterbegin", markup); 
    catInfo.classList.remove("loading")     
  })
  .catch(error => {
    pError.classList.remove("loading")
    pLoader.classList.add("loading")
  });  
};

breedSelect.addEventListener("input", getValue);






