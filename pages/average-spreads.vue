<script setup lang="ts">
const { status, data, error, execute } = await useLazyFetch('/api/generator-avg-spreads-report', {
    // immediate: false
})
const reports = computed(() => data.value?.reports || {});

const convertDate = (date: string) => {
    const arr = date.split('T')[0].split('-');
    return arr[2] + '/' + arr[1] + '/' + arr[0];
}

const day = computed(() => (data.value?.day ? convertDate(data.value.day) : ''));
</script>

<template>
    <div v-if="status === 'idle'">
        <!-- Choose day to generate report, do later -->
        <UButton @click="execute">Generate report</UButton>
    </div>
    <div v-if="status === 'pending'" class="text-center flex gap-1 items-center justify-center">
        <span class="mb-2">Generating report</span>
        <Icon name="i-svg-spinners:3-dots-fade" class="text-2xl"/>
    </div>
    <div v-else-if="status === 'error'" class="text-center">
        Error generating report: {{ error!.data.message }}
    </div>
    <div v-else>
        <AverageSpreadsTable :title="'Average Spreads Report ' + day" :reports="reports"/>
    </div>
</template>