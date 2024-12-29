<script setup lang="ts">
import { GeneralModal } from '#components'
const props = defineProps<{
    title?: string
    data: any
    lastConfigModal?: () => void
    buttons?: any
    modal?: () => void
}>()

const modal = useModal()
const toast = useToast()
const openModal = props.modal ?? function () {
    console.log('Open ModalCard')
    modal.open(GeneralModal, {
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
    <div class="flex flex-col justify-between col-span-2 md:col-span-4 rounded-lg ring-2 dark:ring-gray-100 light:ring-gray-800 p-4" v-if="props && props.title" :key="props.title">
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
                <span :class="value.class ?? ''">{{ value.text }}</span>
            </div>
            <div v-if="props.lastConfigModal" class="flex items-center space-x-1">
                <b>Last configuration:</b>
                <UButton
                    color="blue"
                    variant="ghost"
                    icon="i-heroicons:eye-solid"
                    class="-my-1"
                    @click="props.lastConfigModal"
                />
            </div>
        </div>
        <div v-if="props.buttons" class="flex items-center justify-between mt-3">
            <UButton 
                v-for="btn in props.buttons.values()"
                class="even:bg-gray-500 even:dark:bg-white even:hover:bg-gray-700 even:hover:dark:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                :key="btn.label"
                @click="btn.onClick"
                :disabled="btn.disabled"
            >
                {{ btn.label }}
            </UButton>
        </div>
    </div>
    <div class="card" v-else>
        <div>Loading <Icon name="i-svg-spinners:180-ring-with-bg"/></div>
    </div>
</template>