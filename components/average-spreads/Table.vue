<script setup lang="ts">
import type { ReportParams } from '~/types/averageSpreadsTypes';

const props = defineProps<{
    title: string
    reports: Record<string, ReportParams>
}>()
const reportIndex = ref<string>(
    props.reports ? Object.keys(props.reports)[0] : 'null'
)

const report = computed(() => props.reports[reportIndex.value])
</script>

<template>
    <div v-if="!reports || Object.keys(reports).length === 0" class="text-center">No reports :&#40;</div>
    <div v-else>
        <h2 class="mb-2 text-xl text-center">{{ title }}</h2>
        <div class="flex flex-wrap items-center justify-center gap-2 mb-2">
            <UButton v-for="(value, key) in reports" 
                class="bg-gray-500 dark:bg-white hover:bg-gray-700 hover:dark:bg-gray-200"
                :class="reportIndex === key ? 'bg-green-500 dark:bg-green-400 underline' : ''"
                @click="reportIndex = key"
            >
                {{ key }}
            </UButton>
        </div>
        <div>
            <table class="table w-full text-center text-sm border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th class="w-10 px-4 py-2">Symbols</th>
                        <th v-for="header in report.brokersHeader" class="px-4 py-2">{{ header }}</th>
                        <th class="bg-black dark:bg-white">|</th>
                        <th v-for="header in report.otherBrokers" class="px-4 py-2">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in report.symbolsHeader"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ row }}</td>
                        <td 
                            v-for="col in report.brokersHeader" 
                            class="px-4 py-2"
                            :class="report.avgSpread[row] && report.avgSpread[row][col] && report.avgSpread[row][col].isMin ? 'bg-green-500' : ''"
                        >
                            {{(report.avgSpread[row] && report.avgSpread[row][col]) ? Math.round(report.avgSpread[row][col].value * 100)/100 : null}}
                        </td>
                        <td class="bg-black dark:bg-white">|</td>
                        <td 
                            v-for="col in report.otherBrokers" 
                            class="px-4 py-2"
                            :class="report.avgSpread[row] && report.avgSpread[row][col] && report.avgSpread[row][col].isMin ? 'bg-green-500' : ''"
                        >
                            {{(report.avgSpread[row] && report.avgSpread[row][col]) ? Math.round(report.avgSpread[row][col].value * 100)/100 : null}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>