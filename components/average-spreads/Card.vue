<script setup lang="ts">
import { AverageSpreadsModal } from '#components';

const modal = useModal()
const toast = useToast()
</script>

<template>
    <GeneralCard 
        :title="'Average Spread'" 
        :data="
        {
            'Date': {text: '2022-12-12'},

        }"
        :buttons="
            [
                {
                    label: 'Generate', 
                    onClick: async function() {
                        await navigateTo('/average-spreads')
                    },
                },
                {
                    label: 'View Lastest Report', 
                    onClick: function() {
                        console.log('Handle View Lastest Report')
                    },
                },
            ]"
        :modal="function() {
            console.log('Open AverageSpreadsModal')
            modal.open(AverageSpreadsModal, {
                onSuccess() {
                    toast.add({
                        title: 'Success !',
                        id: 'average-spreads-modal-success'
                    })
                    modal.close()
                },
                onClose() {
                    toast.add({
                        title: 'Close !',
                        id: 'average-spreads-modal-close'
                    })
                    modal.close()
                }
            })
        }"
    />
</template>