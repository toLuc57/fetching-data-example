<script setup lang="ts">
import type { AvgSpreadsResponse } from '~/types/averageSpreadsTypes';

const props = defineProps<{
    isReadOnly: boolean
}>()

const defaultAvgSpreads: AvgSpreadsResponse = {
    gbeBrokers: '',
    otherBrokers: '',
    settings: {
        trainingDayBeginAt: -1,
        exportNonGBEBrokers: false,
        tradingSessions: [],
    }
}

const {data: avgSpreads} = await useFetch('/api/generator-avg-spreads', {
    transform: (data) => data.value
})
const formData = ref<AvgSpreadsResponse>(
    !!avgSpreads.value ? avgSpreads.value : defaultAvgSpreads
)
const validate = (state: AvgSpreadsResponse) => {
    const errors = []
    if(!state)
        errors.push({path: 'settings', message: 'Settings is required'})

    if(!state.settings.trainingDayBeginAt)
        errors.push({path: 'settings.trainingDayBeginAt', message: 'Training Day Begin At is required'})
    else if(state.settings.trainingDayBeginAt >= 0)
        errors.push({path: 'settings.trainingDayBeginAt', message: 'Training Day Begin At must be less than 0'})
    
    return errors
}

const handleAddTradingSession = () => {
    formData.value.settings.tradingSessions.push({
        name: '', 
        timeBeginAt: '', 
        timeEndAt: '',
    })
}
const handleDeleteTradingSession = (index: number) => {
    formData.value.settings.tradingSessions.splice(index, 1)
}

const emit = defineEmits(['success'])
const submitForm = async (event: any) => {
    event.preventDefault()
    
    await $fetch('/api/generator-avg-spreads', {
        method: 'POST',
        body: JSON.stringify({...formData.value}),
    })
    .then(() => {
        emit('success')
    })
}
</script>

<template>
    <div class="max-h-[80vh] overflow-y-auto px-4">
        <UForm
            :validate="validate"
            :state="formData"
            @submit="submitForm"
            class="space-y-5"
        >
            <UFormGroup name="gbeBrokers" label="GBE Brokers">
                <UTextarea
                    v-model="formData.gbeBrokers"
                    placeholder="Enter GBE Brokers"
                    :disabled="props.isReadOnly"
                    :rows="5"
                />
            </UFormGroup>

            <UFormGroup name="otherBrokers" label="Other Broker">
                <UTextarea
                    v-model="formData.otherBrokers"
                    placeholder="Enter Other Brokers"
                    :disabled="props.isReadOnly"
                    :rows="5"
                />
            </UFormGroup>

            <h2 class="mb-4 text-xl">Settings</h2>
            <UFormGroup 
                class="flex items-center space-x-2"
                name="trainingDayBeginAt" 
                label="Training Day Begin At"
            >
                <UInput
                    type="number"
                    class="w-20"
                    v-model="formData.settings.trainingDayBeginAt"
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>
            <UFormGroup 
                class="flex items-center space-x-2"
                name="exportNonGBEBrokers" 
                label="Export NonGBEBrokers"
            >
                <UToggle
                    v-model="formData.settings.exportNonGBEBrokers"
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>

            <!-- Trading Session -->
            <AverageSpreadsTradingSessionForm
                :tradingSessions="formData.settings.tradingSessions"
                :isReadOnly="props.isReadOnly"
                @on-remove="handleDeleteTradingSession"
            />
            <UButton
                icon="i-heroicons:plus"
                label="Add Trading Session"
                :disabled="props.isReadOnly"
                @click="handleAddTradingSession"
            />

            <div class="flex items-center justify-center">
                <UButton type="submit" :disabled="props.isReadOnly">Submit</UButton>
            </div>
        </UForm>
    </div>
</template>