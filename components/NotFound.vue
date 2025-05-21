<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-4xl font-bold mt-6">Uh-oh!</h2>
    <p class="text-lg mt-4">You look lost on your journey!</p>
    <button
      class="bg-red-fire text-white flex items-center justify-center gap-2 py-2 rounded-full text-lg w-1/2 text-center mt-10"
      @click="goHome"
    >
      Go back home
    </button>
  </div>
</template>
<script setup lang="ts">
const goHome = () => {
  window.location.href = "/";
};
</script>
