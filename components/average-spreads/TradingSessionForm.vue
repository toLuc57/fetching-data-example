<script setup lang="ts">
const props = defineProps<{
    isReadOnly: boolean
    tradingSessions: TradingSessions[]
}>()
defineEmits(['on-remove'])
</script>

<template>
    <div 
        v-for="(tradingSession, index) in props.tradingSessions"
        :key="tradingSession.name"
        class="space-y-2 p-2"
    >
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <UFormGroup
                    name="name" 
                    label="Name"
                    class="w-40"
                >
                    <UInput
                        type="text"
                        v-model="tradingSession.name"
                        :disabled="props.isReadOnly"                        
                    />
                </UFormGroup>
                <UFormGroup
                    name="timeBeginAt" 
                    label="Begin At"
                    class="w-20"
                >
                    <UInput
                        v-model="tradingSession.timeBeginAt"
                        :disabled="props.isReadOnly"
                    />
                </UFormGroup>
                <UFormGroup
                    name="timeEndAt" 
                    label="End At"
                    class="w-20"
                >
                    <UInput
                        v-model="tradingSession.timeEndAt"
                        :disabled="props.isReadOnly"
                    />
                </UFormGroup>
            </div>
            <UButton
                variant="ghost"
                color="red"
                icon="i-heroicons:trash"
                @click="$emit('on-remove', index)"
            />
        </div>
    </div>
</template>