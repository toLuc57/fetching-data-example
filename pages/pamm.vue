<script setup lang="ts">
const date = ref(new Date());
</script>

<template>
    <GeneralPbDayPicker v-model="date"/>
</template>