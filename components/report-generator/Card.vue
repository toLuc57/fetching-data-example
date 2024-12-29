<script setup lang="ts">
import { GeneralModal, ReportGeneratorModal } from '#components'
const modal = useModal()
const toast = useToast()

const reportStatus = ref('Success')
const reportStatusClass = computed(() => {
    if(reportStatus.value === 'Success') return 'text-green-600 dark:text-green-400'
    if(reportStatus.value === 'Error') return 'text-red-600 dark:text-red-400'
    return ''
})
</script>

<template>
    <GeneralCard 
        :title="'Statement Generator'" 
        :data="
        {
            'Report date': {text: '2022-12-12 12:12:12'},
            'Report status': {text: reportStatus, class: reportStatusClass},
        }"
        :last-config-modal="function() {
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
                    disabled: false,
                    onClick: function() {
                        console.log('Generate')
                    },
                },
                {
                    label: 'Download Latest Report', 
                    disabled: false,
                    onClick: function() {
                        console.log('Handle Download Latest Report')
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