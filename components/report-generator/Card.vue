<template>
    <GeneralCard 
        :title="'Statement Generator'" 
        :data="
        {
            'Report date': '2022-12-12 12:12:12',
            'Report status': 'success',
            'Report error': 'No error',
        }"
        :last-config="'View eyes'"
        :buttons="
            [
                {label: 'Generate', link: 'https://github.com/Pammboo2/Pammboo2/releases'},
                {label: 'Download Lastest Report', link: 'https://github.com/Pammboo2/Pammboo2/releases'},
            ]"
    />
</template>