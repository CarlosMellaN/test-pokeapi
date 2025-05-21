<template>
  <div class="spinner">
    <img src="@/assets/svg/Loader.svg" alt="Loader" />
  </div>
</template>
<style scoped>
.spinner img {
  animation: spin 1s linear infinite;
  width: 50px; /* opcional */
  height: 50px; /* opcional */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
