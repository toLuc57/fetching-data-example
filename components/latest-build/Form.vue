<script setup lang="ts">
const emit = defineEmits(['submit'])
</script>

<template>
    <div class="col-span-2 rounded-xl">
        <textarea
            placeholder="Enter receivers"
            class="mb-4 h-[100px] w-full rounded-xl p-2 bg-gray-100 dark:bg-gray-800 :placeholder:text-gray-400"
        ></textarea>
        <small class="input-pattern-warning mb-2 block dark:text-gray-400">
            Please enter emails in the following pattern: email1, email2, email3
        </small>
    </div>
    <div class="text-center">
        <UButton @click="$emit('submit')">Submit</UButton>
    </div>
</template>