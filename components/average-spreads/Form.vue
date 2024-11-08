<script setup lang="ts">
import type { AvgSpreadsResponse } from '~/types/averageSpreadsTypes';

const props = defineProps<{
    isReadOnly: boolean
}>()

const defaultConfig: AvgSpreadsResponse = {
    gbeBrokers: 'GBETY, GBELD, GBENY, GBPCHF',
    outputTables: 'GBPJPY, USDCAD',
    settings: {
        trainingDayBeginAt: -1,
        exportNonGBEBrokers: true,
        tradingSessions: [
            {
                name: "Asian",
                timeBeginAt: "01:00",
                timeEndAt: "09:00",
            },
            {
                name: "London",
                timeBeginAt: "09:00",
                timeEndAt: "17:00",
            },
            {
                name: "New York",
                timeBeginAt: "15:00",
                timeEndAt: "23:00",
            },
        ],
    }
}

const formData = ref<AvgSpreadsResponse>(defaultConfig);

const validate = (state: AvgSpreadsResponse) => {
    const errors = []
    if(!state)
        errors.push({path: 'settings', message: 'Settings is required'})

    return errors
}

const handleAddTradingSession = () => {
    formData.value.settings.tradingSessions.push(
        {name: '', 
        timeBeginAt: '', 
        timeEndAt: '',
    })
}
const handleDeleteTradingSession = (index: number) => {
    formData.value.settings.tradingSessions.splice(index, 1)
}
</script>

<template>
    <div class="max-h-[80vh] overflow-y-auto px-4">
        <UForm
            :validate="validate"
            :state="formData"
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

            <UFormGroup name="outputTables" label="Output Tables">
                <UTextarea
                    v-model="formData.outputTables"
                    placeholder="Enter Output Tables"
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
                <UButton @click="$emit('close')">Submit</UButton>
            </div>
        </UForm>
    </div>
</template>