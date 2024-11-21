<script setup>
const { status, data } = await useFetch('/api/generator-avg-spreads-report', {
    lazy: true
})
const reports = computed(() => data.value?.reports || {})

</script>

<template>
    <div v-if="status === 'pending'" class="text-center flex gap-1 items-center justify-center">
        <span class="mb-2">Generating report</span>
        <Icon name="i-svg-spinners:3-dots-fade" class="text-2xl"/>
    </div>
    <div v-else>
        <AverageSpreadsTable :title="'Average Spreads Report ' + data.day" :reports="reports"/>
    </div>
</template>