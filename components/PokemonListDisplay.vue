<template>
  <div :class="[isFavorites ? '-mt-360' : 'mt-24']">
    <div v-if="pokemons.length === 0" class="text-center py-10 text-gray-500">
      <slot name="empty"> Don't have pokemons to show </slot>
    </div>
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      class="bg-white p-3 rounded-md mb-2"
    >
      <div class="flex justify-between w-full">
        <div @click="openCard(pokemon.name)" class="flex-1 cursor-pointer">
          <h3
            :class="[
              'font-medium text-[22px] capitalize',
              isFavorites ? '' : '',
            ]"
          >
            {{ pokemon.name }}
          </h3>
        </div>
        <div @click.stop>
          <AddRemovePokemonFavorites :pokemon="pokemon" />
        </div>
      </div>
    </div>
    <PokemonCard
      v-if="showDialog"
      :pokemonName="selectedPokemon"
      v-model:show-dialog="showDialog"
    />
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from "@/types/pokemonTypes";
import AddRemovePokemonFavorites from "./AddRemovePokemonFavorites.vue";
import PokemonCard from "./PokemonCard.vue";
import { ref } from "vue";

defineProps<{ pokemons: Pokemon[]; isFavorites?: boolean }>();

const showDialog = ref(false);
const selectedPokemon = ref("");

function openCard(name: string) {
  selectedPokemon.value = name;
  showDialog.value = true;
}
</script>
<style scoped>
.-mt-360 {
  margin-top: -360px;
}
</style>
