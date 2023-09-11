

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
    formEl: document.querySelector('.js-search-cats-form[data-id="1"]'),
    catInfo : document.querySelector(".cat-info"),
    loader : document.querySelector(".loader"),
    error: document.querySelector(".error"),
    selectEl: document.querySelector(".breed-select"),
    divCatInfo : document.querySelector(".cat-info"),
};


refs.loader.style.display = "none";
refs.error.style.display = "none";


function loadCatsInfo() {
  refs.loader.style.display = "block";
  refs.selectEl.style.display = "none";
  refs.divCatInfo.style.display = "none";
};

function upLoaded() {
 refs.loader.style.display = "none";
  refs.selectEl.style.display = "block";
  refs.divCatInfo.style.display = "block";
}


fetchBreeds().then(cats => {
  const markUp = cats.map((el) => `<option value=${el.id}>${el.name}</option>`).join("");
  refs.selectEl.innerHTML = markUp;
  return cats;
})
  .catch((error) => {
    refs.loader.style.display = "none";
      Notify.failure(error);
  });



  refs.selectEl.addEventListener('change', event => {
  loadCatsInfo();
  const value = refs.selectEl.value;
    fetchCatByBreed(value)
      .then(renderCats)
      .catch(error => {
        refs.loader.style.display = "none";
        Notify.failure(error)
      }); 
  refs.divCatInfo.innerHTML = "";
});



function renderCats(catsInfo) {
  upLoaded();
  const name = catsInfo[0].breeds[0].name;
  const img = catsInfo[0].url;
  const discription = catsInfo[0].breeds[0].description;
  const temperament = catsInfo[0].breeds[0].temperament;
  const markUp = `<img src="${img}" height=150/> <h2 class=cats-name>${name}</h2> ${discription}, <h3>Temperament</h3>${temperament}`;
  refs.catInfo.innerHTML = markUp;
 
};
