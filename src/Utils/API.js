import axios from 'axios';

export const getRandomDog = () => axios.get("https://dog.ceo/api/breeds/image/random");

// export const get6RandomDogs = () => axios.get("https://dog.ceo/api/breeds/image/random/6");

export const get6RandomDogs = () => axios({
  method:'GET',
  url:"https://cors-anywhere.herokuapp.com/https://api.thedogapi.com/v1/images/search?size=thumb&format=json&order=RANDOM&mime_types=jpg&limit=6", 
  headers: {
    "x-api-key": "a796d190-0cd7-4c5f-ad66-1ebea44657b9"
  }
})
 


export const getDogBreed = (breedName) => axios.get(`https://dog.ceo/api/breed/${breedName}/images`);

export const getBreedList = () => axios.get("https://dog.ceo/api/breeds/list");