<script setup lang="ts">
const emit = defineEmits(['close'])

const props = defineProps<{
    title?: string
}>()

const onClose = () => {
    emit('close')
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
                        @click="onClose"
                    />
                </div>
            </template>
            <slot name="content"></slot>
        </UCard>
    </UModal>
</template>