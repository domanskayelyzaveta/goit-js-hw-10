import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_dmMd57pNIb0IQoURtlkevMz3LOupFGSUc7mG25hTBeQEy63sUaTJ8NRlSdO37asw";



export function fetchBreeds() {
    const baseUrl = "https://api.thecatapi.com/v1/breeds";
    const url = `${baseUrl}`;
  
    return axios.get(url).then((response) => response.data).catch(error => {
        Notify.failure(error);
    });
};


export function fetchCatByBreed(breedId) {
    const baseUrl = "https://api.thecatapi.com/v1/images/search";
    const PARAMS = new URLSearchParams({ breed_ids: breedId });
    const url = `${baseUrl}?${PARAMS}`;

    return axios.get(url).then(response => response.data).catch(error => {
        Notify.failure(error);
    });
};
