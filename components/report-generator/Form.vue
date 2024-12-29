<script setup lang="ts">
import type { GeneratorConfigResponse } from '~/types/mt4GeneratorType';

const props = defineProps<{
    isReadOnly: boolean
}>()

const defaultConfig: GeneratorConfigResponse = {
    owner: '',
    leverage: 0,
    excludeOpenTrades: false,
    brokerName: '',
    symbols: "",
    removedSymbol: [],
    isSendMail: false,
    to: '',
    bbc: '',
    reportParams: {
        category: [],
        additionalBalance: [],
        fixedBalance: []
    },
}
const formData = ref<GeneratorConfigResponse>(defaultConfig);

const validate = (state: GeneratorConfigResponse) => {
    const errors = []
    const emailPattern =
        /^([\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,})(,\s*[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,})*$/;

    if (!state.owner) 
        errors.push({path: 'owner', message: 'Owner is required'})
    if (!state.leverage) 
        errors.push({path: 'leverage', message: 'Leverage is required'})
   
    return errors
}
</script>

<template>
    <div class="max-h-[80vh] overflow-y-auto px-4">
        <UForm 
            :validate="validate"
            :state="formData"
            class="space-y-5"
            @submit="() => console.log('submitted')"
            >
            <UFormGroup name="owner" label="Owner">
                <UInput
                    type="text"
                    v-model="formData.owner"
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>
            <UFormGroup name="leverage" label="Leverage">
                <UInput
                    type="number"
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>
            <UFormGroup
                name="excludeOpenTrades"
                label="Exclude Open Trades"
                class="flex items-center space-x-2"
            >
                <UCheckbox
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>
            <UFormGroup name="brokerName" label="Broker Name">
                <UInput
                    type="text"
            />
            </UFormGroup>

            <UFormGroup name="symbol" label="Symbols">
            <UTextarea
                placeholder="Enter symbols"
                :disabled="props.isReadOnly"
                :rows="5"
            />
            </UFormGroup>

            <h2 class="mb-4 text-xl">Email Configure</h2>
            <UFormGroup 
                name="isSendMail" 
                label="Send mail status"
                class="flex items-center space-x-2"
            >
                <UToggle
                    :disabled="props.isReadOnly"
                />
            </UFormGroup>
            <UFormGroup 
                name="to" 
                label="To"
                :helper="'Please enter emails in the following pattern: email1, email2, email3'"
            >
                <UInput
                    type="text"
                    v-model="formData.to"
                    :disabled="props.isReadOnly"                    
                />
            </UFormGroup>
            <UFormGroup 
                name="bcc" 
                label="BCC"
                :helper="'Please enter emails in the following pattern: email1, email2, email3'"
            >
                <UInput
                    type="text"
                    v-model="formData.bbc"
                    :disabled="props.isReadOnly"                    
                />
            </UFormGroup>

            <h2 class="mb-4 text-xl">Report Parameters</h2>
            <!-- CategoryForm -->
            <UButton
                :disabled="props.isReadOnly"
                @click="() => console.log('Add category')"
            >
                Add Category
            </UButton>
            
            <fieldset>
                <div class="mb-2 flex items-center justify-between">
                    <h2 class="text-xl">Additional Balance</h2>
                    <UButton
                        :disabled="props.isReadOnly"
                        icon="i-heroicons:plus-20-solid"
                        @click="() => console.log('Add additional balance')"
                    />
                </div>
                <div class="mb-4">
                    <!-- AdditionalBalanceForm  -->
                </div>
            </fieldset>
            <div class="flex items-center justify-center">
                <UButton>Submit</UButton>
            </div>
        </UForm>
    </div>
</template>