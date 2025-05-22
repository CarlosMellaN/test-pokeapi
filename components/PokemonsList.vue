<template>
  <div
    class="w-full container w-11/12 max-w-2xl mt-6 pl-5 pr-5 md:pl-0 md:pr-0"
  >
    <PokemonSearcher @error="handleSearchError" />
    <SpinnerLoading v-if="isLoading" />
    <NotFound v-if="hasError" />
    <div class="flex flex-col" v-if="!isLoading && !hasError">
      <template v-if="showFavorites">
        <PokemonListDisplay
          :pokemons="favoritePokemonsList"
          :isFavorites="true"
          @open-modal="openModal"
        >
          <template #empty> Don't have pokemons to show </template>
        </PokemonListDisplay>
      </template>
      <template v-else>
        <InfiniteScroll
          :loadMore="fetchListPokemons"
          :hasMore="hasMore"
          :isLoading="isLoading"
        >
          <template #default>
            <PokemonListDisplay
              :pokemons="pokemonsList"
              :isFavorites="false"
              @open-modal="openModal"
            >
              <template #empty> No hay Pokémon para mostrar. </template>
            </PokemonListDisplay>
          </template>
        </InfiniteScroll>
      </template>
    </div>
    <BottomBar @toggleFavorites="setShowFavorites" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Pokemon } from "@/types/pokemonTypes";
import { getAllPokemons } from "@/services/pokemonServices";
import PokemonSearcher from "./PokemonSearcher.vue";
import PokemonListDisplay from "./PokemonListDisplay.vue";
import BottomBar from "./BottomBar.vue";
import InfiniteScroll from "./InfiniteScroll.vue";
import SpinnerLoading from "@/components/SpinnerLoading.vue";
import { useFavoritePokemonStore } from "@/store/pokemonStore";

const isLoading = ref(false);
const pokemonsList = ref<Pokemon[]>([]);
const favoritePokemonsList = computed(() => favoriteStore.favoritesPokemons);
const showFavorites = ref(false);
const favoriteStore = useFavoritePokemonStore();

const visiblePokemons = computed(() => {
  return showFavorites.value ? favoritePokemonsList.value : pokemonsList.value;
});

const hasError = ref(false);
function handleSearchError(val: boolean) {
  hasError.value = val;
}

const setShowFavorites = (val: boolean) => {
  showFavorites.value = val;
};

const limit = 100;
const offset = ref(0);
const hasMore = ref(true);

const fetchListPokemons = async () => {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  try {
    const pokemons = await getAllPokemons(limit, offset.value);
    if (pokemons.results.length < limit) {
      hasMore.value = false;
    }
    pokemonsList.value = pokemonsList.value.concat(
      pokemons.results.map((pokemon: any) => ({
        name: pokemon.name,
        url: pokemon.url,
      }))
    );
    offset.value += limit;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    hasMore.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchListPokemons();
});
</script>
