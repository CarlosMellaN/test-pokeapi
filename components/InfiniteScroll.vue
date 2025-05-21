<template>
  <div>
    <slot />
    <div ref="sentinel"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  loadMore: {
    type: Function,
    required: true,
  },
  hasMore: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const sentinel = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const observe = () => {
  if (observer.value) observer.value.disconnect();
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && props.hasMore && !props.isLoading) {
      props.loadMore();
    }
  });
  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
};

onMounted(() => {
  observe();
});

onUnmounted(() => {
  if (observer.value && sentinel.value) {
    observer.value.unobserve(sentinel.value);
  }
});

watch(
  () => props.hasMore,
  () => {
    observe();
  }
);
</script>
