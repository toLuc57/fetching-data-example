<script setup lang="ts">
import { GeneralModal, ReportGeneratorModal } from '#components'
const modal = useModal()
const toast = useToast()
</script>

<template>
    <GeneralCard 
        :title="'Statement Generator'" 
        :data="
        {
            'Report date': '2022-12-12 12:12:12',
            'Report status': 'Success',
            'Report error': 'No error',
        }"
        :last-config-modal="function() {
            console.log('Open GeneralModal')
            modal.open(GeneralModal, {
                onSuccess() {
                    toast.add({
                        title: 'Success !',
                        id: 'eye-modal-success'
                    })
                },
                onClose() {
                    toast.add({
                        title: 'Close !',
                        id: 'eye-modal-close'
                    })
                    modal.close()
                }
            })
        }"
        :buttons="
            [
                {
                    label: 'Generate', 
                    onClick: function() {
                        console.log('Handle Generate')
                    },
                },
                {
                    label: 'Download Lastest Report', 
                    onClick: function() {
                        console.log('Handle Download Lastest Report')
                    },
                },
            ]"
        :modal="function() {
            console.log('Open ReportGeneratorModal')
            modal.open(ReportGeneratorModal, {
                onSuccess() {
                    toast.add({
                        title: 'Success !',
                        id: 'report-generator-modal-success'
                    })
                    modal.close()
                },
                onClose() {
                    toast.add({
                        title: 'Close !',
                        id: 'report-generator-modal-close'
                    })
                    modal.close()
                }
            })
        }"
    />
</template>