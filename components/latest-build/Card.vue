<script setup lang="ts">
import { GeneralModal, LatestBuildModal } from '#components'

const { data } = await useFetch('/api/get-latest-build')
const { title, version, description, releasedAt } = { ...data.value }

const toast = useToast()
const modal = useModal()
</script>

<template>
    <GeneralCard 
        :data="{ 
            version : { text: version }, 
            description : {text: description}, 
            'Released At': {text: releasedAt},
        }" 
        :title="title!"
        :buttons="
            [
                {
                    label: 'Check now',
                    onClick: function() {
                        console.log('Handle Check now')
                    },
                },
            ]"
        :modal="function() {
            console.log('Open LatestBuildModal')
            modal.open(LatestBuildModal, {
                onSuccess() {
                    toast.add({
                        title: 'Success !',
                        id: 'last-build-modal-success'
                    })
                    modal.close()
                },
                onClose() {
                    toast.add({
                        title: 'Close !',
                        id: 'last-build-modal-close'
                    })
                    modal.close()
                },
            })
        }"
    />
</template>