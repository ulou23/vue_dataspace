<template>
   <v-container>
<v-snackbar :timeout="-1" :value="true" absolute centered shaped > Add DataSpace </v-snackbar>
<div v-if="!submitted">
    <v-form ref="form" lazy-validation>
        <v-text-field v-model="dataspace.title" :rules="[(v)=> !!v || 'title is required']" label="Title" required></v-text-field>
        <v-text-field v-model="dataspace.desc" label="Description" required> </v-text-field>
    </v-form>
    <v-btn color="primary" class="mt-3" @click="saveData"> Submit </v-btn>
</div>
<div v-else> <v-card class="mx-auto">
    <v-card-title> Submitted !</v-card-title>
    <v-card-subtitle> Click to add new data space</v-card-subtitle>
    <v-card-actions> <v-btn  color="info" @click="newData"> Add</v-btn>
    </v-card-actions>
    </v-card>
</div>

   </v-container>
</template>

<script>
import DataSpaceService from "@/DataService"
export default {
    name: "add-data",
    data(){
        return {
            dataspace:{
                id: null,
                title: "",
                desc: "",
            },
            submitted:false,
        };
    },
    methods: {
        saveData(){
            var data={
                title: this.dataspace.title,
                desc: this.dataspace.desc,
            };
            DataSpaceService.create(data).then((res)=> {
                this.dataspace.id =res.data.id;
                console.log(res.data);
                this.submitted=true;
            }).catch((e)=> console.log(e))
        },
        newData(){
            this.submitted=false;
            this.dataspace={};
        }
    }
    
}
</script>
