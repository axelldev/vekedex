<script setup>
defineProps({
  hasPrev: Boolean,
  hasNext: Boolean
})
</script>

<template>
  <div class="flex justify-end gap-3 p-8 max-w-5xl mx-auto">
    <button
      @click="$emit('previousPage')"
      :class="{ 'opacity-70': !hasPrev, 'hover:bg-neutral-900': hasPrev }"
      class="cursor-pointer bg-neutral-800 rounded-lg px-4 py-2 transition-colors"
      :disabled="!hasPrev"
    >
      PREVIOUS
    </button>
    <button
      @click="$emit('nextPage')"
      :class="{ 'opacity-70': !hasNext, 'hover:bg-neutral-900': hasNext }"
      class="cursor-pointer bg-neutral-800 rounded-lg px-4 py-2 transition-colors"
      :disabled="!hasNext"
    >
      NEXT
    </button>
  </div>
</template>
