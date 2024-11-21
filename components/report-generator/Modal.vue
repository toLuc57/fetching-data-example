<script setup lang="ts">
const emit = defineEmits(['success', 'close'])

const onSuccess = () => {
    emit('success')
}

const onClose = () => {
    emit('close')
}
</script>

<template>
    <GeneralModal 
        :title="'Config generator modal'"
        @close="onClose"
    >
    <template #content>
        <ReportGeneratorForm 
            :is-read-only="false"
            @success="onSuccess"
        />
    </template>
    </GeneralModal>
</template>