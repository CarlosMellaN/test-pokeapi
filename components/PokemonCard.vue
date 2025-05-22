<template>
  <Teleport to="body">
    <div
      v-if="showDialog"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black bg-opacity-70"
        @click="closeDialog"
      ></div>
      <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <img
          src="@/assets/svg/background.svg"
          alt="background"
          class="pokemoncard-bg absolute left-0 top-0 w-full object-cover z-0 pointer-events-none"
        />
        <div
          class="pokemoncard-imgblock relative flex flex-col items-center justify-center w-full"
        >
          <button
            @click="closeDialog"
            class="absolute top-0 -right-4 z-20 rounded-full p-1 flex justify-end"
          >
            <XCircleIcon class="w-9 h-9 text-white" />
          </button>
          <img
            :src="pokemon?.imageFront"
            :alt="pokemon?.name"
            class="pokemoncard-img relative z-10 mx-auto object-contain"
          />
        </div>
        <p class="text-lg font-bold text-gray-500">Name: {{ pokemon?.name }}</p>
        <div class="border-b border-gray-200 my-4"></div>
        <p class="text-lg font-bold text-gray-500">
          Weight: {{ pokemon?.weight }}
        </p>
        <div class="border-b border-gray-200 my-4"></div>
        <p class="text-lg font-bold text-gray-500">
          Height: {{ pokemon?.height }}
        </p>
        <div class="border-b border-gray-200 my-4"></div>
        <p class="text-lg font-bold text-gray-500 capitalize">
          Types:
          {{
            pokemon?.types
              .map((type) => type?.name)
              .join(", ")
              .toLowerCase()
          }}
        </p>
        <div class="border-b border-gray-200 my-4"></div>
        <div class="flex justify-between mt-6">
          <button
            class="bg-red-fire text-white flex items-center gap-2 px-8 py-2 rounded-full text-lg"
            @click="sharePokemon"
          >
            Share to my friends
          </button>
          <div class="flex items-center mt-1">
            <AddRemovePokemonFavorites v-if="pokemon" :pokemon="pokemon" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Pokemon } from "@/types/pokemonTypes";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { getPokemon } from "@/services/pokemonServices";
import AddRemovePokemonFavorites from "./AddRemovePokemonFavorites.vue";
import { XCircleIcon } from "@heroicons/vue/24/solid";

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
const pokemon = ref<Pokemon | null>(null);
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

function sharePokemon() {
  if (pokemon.value) {
    const { name, height, weight, types } = pokemon.value;
    const typesString = types.map((t) => t.name).join(", ");
    const text = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: ${typesString}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        console.error("can't copy to clipboard:", err);
      });
  }
}
</script>
<style scoped>
.pokemoncard-bg {
  height: 240px;
  max-width: 100%;
}
.pokemoncard-imgblock {
  height: 240px;
}
.pokemoncard-img {
  max-height: 200px;
  width: 200px;
  height: 200px;
}
</style>
