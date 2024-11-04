<script setup lang="ts">
import { GeneralModal } from '#components'
const props = defineProps<{
    title?: string
    data: any
    lastConfig?: any
    buttons?: any
    function?: () => void
}>()

const modal = useModal()
const toast = useToast()
const openModal = props.function ?? function () {
    console.log('Open ModalCard')
    modal.open(GeneralModal, {
        onSuccess() {
            toast.add({
                title: 'Success !',
                id: 'modal-success'
            })
        },
        onClose() {
            toast.add({
                title: 'Close !',
                id: 'modal-close'
            })
            modal.close()
        },
    })
}
</script>

<template>
    <div class="flex flex-col justify-between sm:col-span-6 md:col-span-4 rounded-lg ring-2 dark:ring-gray-100 light:ring-gray-800 p-4" v-if="props && props.title" :key="props.title">
        <div class="flex items-center justify-between mt-3">
            <h2 class="text-xl font-bold">{{ props.title ?? 'No title' }}</h2>
            <UButton 
                color="white"
                variant="ghost"
                icon="i-heroicons:cog-6-tooth-20-solid"
                class="-my-1"
                @click="openModal"
            />
        </div>
        <div class="mt-3">
            <div v-for="(value, key) in props.data">
                <b style="text-transform: capitalize;">{{ key }}: </b>
                <span>{{ value }}</span>
            </div>
            <div v-if="props.lastConfig" class="flex">
                <b>Last configuration:</b>
                <UButton
                    color="blue"
                    variant="ghost"
                    icon="i-heroicons:eye-solid"
                    class="-my-1"
                />
            </div>
        </div>
        <div v-if="props.buttons" class="flex items-center justify-between mt-3">
            <UButton 
                v-for="btn in props.buttons.values()"
                class="card-button"
                :key="btn.label"
                :to="`${btn.link}`"
                target="_blank"
            >
                {{ btn.label }}
            </UButton>
        </div>
    </div>
    <div class="card" v-else>
        <div>Loading <Icon name="i-svg-spinners:180-ring-with-bg"/></div>
    </div>
</template>

<style lang="css">
.card-button {
    &:nth-child(even) {
        background-color: #3c3c3c;
        color: #f3f4f6;
    }
}
</style>