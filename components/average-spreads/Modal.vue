<script setup lang="ts">
const emit = defineEmits(['success', 'close'])

const onSuccess = () => {
    emit('success')
    navigateTo('/average-spreads')
}

const onClose = () => {
    emit('close')
}
</script>

<template>
    <GeneralModal 
        :title="'Average spreads modal'"
        @close="onClose"
    >
    <template #content>
        <AverageSpreadsForm 
            :is-read-only="false" 
            @success="onSuccess"
        />
    </template>    
    </GeneralModal>
</template>