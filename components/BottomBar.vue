<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex justify-center gap-4 py-4 bg-white shadow-lg z-10"
  >
    <button
      :class="[
        !isFavorites ? 'bg-red-fire text-white' : 'bg-grayish text-white',
        'flex items-center gap-2 px-8 py-4 rounded-full text-lg',
      ]"
      @click="setShowFavorites(false)"
    >
      <ListBulletIcon class="w-6 h-6" />
      All
    </button>
    <button
      :class="[
        isFavorites ? 'bg-red-fire text-white' : 'bg-grayish text-white',
        'flex items-center gap-2 px-8 py-4 rounded-full text-lg',
      ]"
      @click="setShowFavorites(true)"
    >
      <StarIcon class="w-6 h-6" />
      Favorites
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useFavoritePokemonStore } from "@/store/pokemonStore";
import { ListBulletIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["toggleFavorites"]);
const favoriteStore = useFavoritePokemonStore();
const isFavorites = ref(false);

function setShowFavorites(val: boolean) {
  isFavorites.value = val;
  emit("toggleFavorites", val);
}
</script>
<style scoped>
button {
  min-width: 150px;
}
</style>
