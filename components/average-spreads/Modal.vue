<template>
    <GeneralModal 
        :title="'Average spreads modal'"
    >
    <template #content>
        <AverageSpreadsForm :is-read-only="false"/>
    </template>    
    </GeneralModal>
</template>