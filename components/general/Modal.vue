<script setup lang="ts">
const emit = defineEmits(['success', 'close'])

const props = defineProps<{
    title?: string
    onSuccess?: () => void

}>()

const onSuccess = props.onSuccess ?? function () {
    emit('success')
}
</script>

<template>
    <UModal prevent-close>
        <UCard
            :ui="{
                ring: '',
                divide: 'divide-y divide-gray-100 dark:divide-gray-800',
            }"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ props.title ?? 'No title' }}
                    </h3>
                    <UButton 
                        icon="i-heroicons:x-mark-20-solid"
                        variant="ghost"
                        color="gray"
                        cursor="pointer"
                        class="-my-1"
                        @click="emit('close')"
                    />
                </div>
            </template>
            <slot name="content"></slot>
            <div class="flex items-center justify-center">
                <UButton @click="onSuccess">Submit</UButton>
            </div>
        </UCard>
    </UModal>
</template>