<script setup lang="ts">
import { feedsInfo } from '~~/utils/api';

const colorMode = useColorMode()
const isDark = computed({

    get () {
        return colorMode.value === 'dark'
    },
    set () {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>

<template>
    <div class="sidebar md:m-4">
        <NuxtLink 
            class="sidebar-item" 
            key="Pammboo2"
            to="/"
        >
            Pammboo2
        </NuxtLink>
        <NuxtLink 
            class="sidebar-item"
            :class="{active: $route.path.startsWith(`/${key}`)}" 
            v-for="(list, key) in feedsInfo" 
            :key="key"
            :to="`/${key}`"
        >
            <UIcon :name="list.icon" />
            {{ list.title }}
        </NuxtLink>
        <UButton 
            class="-my-1"
            :icon="isDark ? 'i-heroicons:sun-20-solid' : 'i-heroicons:moon-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
    </div>
</template>

<style lang="css">
.sidebar {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}
</style>