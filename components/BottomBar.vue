<template>
  <div
    class="fixed bottom-0 left-0 right-0 flex justify-center py-4 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05),0_-4px_6px_-2px_rgba(0,0,0,0.05)] z-10"
  >
    <div class="w-full w-11/12 max-w-2xl flex gap-4">
      <button
        :class="[
          !isFavorites ? 'bg-red-fire text-white' : 'bg-grayish text-white',
          'flex items-center justify-center gap-2 py-2 rounded-full text-lg w-1/2 text-center',
        ]"
        @click="setShowFavorites(false)"
      >
        <ListBulletIcon class="w-6 h-6" />
        All
      </button>
      <button
        :class="[
          isFavorites ? 'bg-red-fire text-white' : 'bg-grayish text-white',
          'flex items-center justify-center gap-2 py-2 rounded-full text-lg w-1/2 text-center',
        ]"
        @click="setShowFavorites(true)"
      >
        <StarIcon class="w-6 h-6" />
        Favorites
      </button>
    </div>
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
  min-width: 120px;
}
</style>
