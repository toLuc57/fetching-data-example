<template>
    <GeneralModal 
        :title="'Config generator modal'"
    >
    <template #content>
        <ReportGeneratorForm :is-read-only="false"/>
    </template>
    </GeneralModal>
</template>