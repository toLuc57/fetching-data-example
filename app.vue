<template>
    <!-- <GeneralAppHeader/> -->
    <div id="app" class="p-2 sm:ml-64 min-h-screen flex">
        <GeneralAppSideBar/>
        <div class="flex flex-1 flex-col m-2 p-3 rounded-3xl bg-gray-200 dark:bg-gray-800 overflow-y-auto">
            <NuxtPage/>
        </div>
    </div>
    <UModals/>
</template>

<style lang ="css">
body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>