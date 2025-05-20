<template>
  <Teleport to="body">
    <div
      v-if="showDialog"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black bg-opacity-50"
        @click="closeDialog"
      ></div>
      <div
        class="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
      >
        <button
          @click="closeDialog"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>
        <img
          :src="pokemon?.imageFront"
          alt="pokemon.name"
          class="mx-auto mb-2 w-20 h-20"
        />
        <h2 class="text-lg font-bold capitalize">{{ pokemon?.name }}</h2>
        <p class="text-sm text-gray-500">Weight {{ pokemon?.weight }}</p>
        <button
          @click="closeDialog"
          class="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Pokemon } from "@/types/pokemonTypes";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { getPokemon } from "@/services/pokemonServices";

const props = defineProps<{
  pokemonName: string;
  showDialog: boolean;
}>();

const emit = defineEmits<{
  (e: "update:showDialog", value: boolean): void;
}>();
const closeDialog = () => {
  pokemon.value = undefined;
  emit("update:showDialog", false);
};
const pokemon = ref<Pokemon>();
const fetchPokemon = async (name: string) => {
  try {
    const pokemonDetails = mapPokemonDetails(await getPokemon(name));
    pokemon.value = pokemonDetails;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
  }
};
watch(
  () => props.showDialog,
  (newValue) => {
    if (newValue && props.pokemonName) {
      fetchPokemon(props.pokemonName);
    }
  }
);
onMounted(() => {
  if (props.showDialog && props.pokemonName) {
    fetchPokemon(props.pokemonName);
  }
});
</script>
