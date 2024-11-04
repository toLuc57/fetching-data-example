<template>
    <!-- <GeneralAppHeader/> -->
    <div id="app" class="flex h-screen">
        <GeneralAppSideBar/>
        <div class="flex flex-1 flex-col m-5 p-5 rounded-3xl bg-gray-200 dark:bg-gray-800 overflow-y-auto">
            <NuxtPage />
        </div>
    </div>
    <UModals/>
</template>

<style lang ="css">
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>