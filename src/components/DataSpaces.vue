<template>
    <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" md="8">
            <v-text-field v-model="title" label="Search by title"> </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-btn small @click="searchT"> Search </v-btn>
        </v-col>
    </v-row>
</template>