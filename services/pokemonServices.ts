import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Content-type": "application/json",
  },
});

export const getAllPokemons = async () => {
  try {
    const response = await apiClient.get(
      `pokemon?limit=${1400}`
      // "pokemon"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    throw error;
  }
};

export const getPokemon = async (name: string) => {
  try {
    const response = await apiClient.get(`pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    throw error;
  }
};
