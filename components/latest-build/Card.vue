<script setup lang="ts">
import { LatestBuildModal } from '#components'

const { data } = await useFetch('/api/getting-version')
const { title, version, description } = { ...data.value }

const toast = useToast()
const modal = useModal()
</script>

<template>
    <GeneralCard 
        :data="{ version, description }" 
        :title="title" 
        :buttons="
            [
                {
                    label: 'Check now',
                    link: 'https://github.com/Pammboo2/Pammboo2/releases',
                },
            ]"
        :function="function() {
            console.log('Open LatestBuildModal')
            modal.open(LatestBuildModal, {
                onSuccess() {
                    toast.add({
                        title: 'Success !',
                        id: 'last-build-modal-success'
                    })
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