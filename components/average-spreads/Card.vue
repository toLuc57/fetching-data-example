<script setup lang="ts">
import { AverageSpreadsModal } from '#components';

const modal = useModal()
const toast = useToast()

const disabled = ref<boolean>(
    1 < 3 ? false : true
)

</script>

<template>
    <GeneralCard 
        :title="'Average Spread'" 
        :data="
        {
            'Date': {text: 'GeneralPbDayPicker'},
        }"
        :buttons="
            [
                {
                    label: 'Generate', 
                    onClick: async function() {
                        await navigateTo('/average-spreads')
                    },
                    disabled,
                },
                {
                    label: 'Download Latest Report', 
                    onClick: function() {
                        console.log('Handle View Latest Report')
                    },
                    disabled: true,
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