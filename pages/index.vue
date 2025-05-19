<template>
  <div class="grid place-items-center h-screen">
    <PokemonsList v-if="isLoading" />
    <div class="text-center max-w-lg px-4" v-else>
      <div class="flex justify-center mb-6">
        <img :src="pikachuSvg" alt="pikachu" />
      </div>
      <h1 class="text-2xl font-bold mb-6">Welcome to Pokédex</h1>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <button class="button-primary" @click="getListPokemons()">
        Get started
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonsList from "@/components/PokemonsList.vue";
import pikachuSvg from "@/assets/svg/pikachu.svg";

const isLoading = ref(false);
const getListPokemons = () => {
  isLoading.value = true;
};
</script>
<style scoped>
.button-primary {
  margin-top: 64px;
}
</style>
