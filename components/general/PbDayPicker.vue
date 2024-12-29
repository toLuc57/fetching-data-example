<script setup lang="ts">
import { _columns } from "#tailwind-config/theme";
import { DatePicker as VDatePicker} from "v-calendar";
import 'v-calendar/style.css';
import { format } from "date-fns";

const model = defineModel()
const emit = defineEmits(["update:modelValue"]);

const date = computed({
  get() {
    return model.value as Date
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const attrs = ref([
    {
      key: 'today',
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },
      dates: date,
    }
  ])
</script>

<template>
    <UPopover class="flex items-center space-x-1" :popper="{ placement: 'bottom-start' }">
        <UButton
            icon="i-heroicons:calendar"
            color="blue"
            variant="outline"
            class="-my-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            :label="format(date, 'd MMM, yyy')"
        />
        <template #panel>
            <div class="p-4">
                <VDatePicker
                  v-model="date"
                  :attributes="attrs"
                  :is-dark="{ selector: ':root', darkClass: 'dark' }"
                  :max-date="new Date()"
                />
            </div>
        </template>
    </UPopover>
</template>