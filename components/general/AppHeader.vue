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
    <div class="header">
        <NuxtLink 
            class="header-item" 
            key="Pammboo2"
            to="/"
        >
            Pammboo2
        </NuxtLink>
        <NuxtLink 
            class="header-item"
            :class="{active: $route.path.startsWith(`/${key}`)}" 
            v-for="(list, key) in feedsInfo" 
            :key="key"
            :to="`/${key}`"
        >
            {{ list.title }}
        </NuxtLink>
        <UButton 
            class="header-item -my-1"
            :icon="isDark ? 'i-heroicons:sun-20-solid' : 'i-heroicons:moon-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
    </div>
</template>

<style lang="css">
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    background-color: #0b0b0b;
    z-index: 999;

    .header-item {
        display: inline-block;
        color: #fff;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        margin-right: 50px;

        &:hover {
            color: #3d3d3d;
        }

        &:first-child {
            margin-left: 15px;
        }
        
    }

    .active {
        color: #86dc89;
    }
}
</style>