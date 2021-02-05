<template>

<div v-if="currSpace" class="py-3 grey lighten-5">
  <p class="pa-16 mx-auto"> EDIT your Data Space </p>
   <v-form ref="form" lazy-validation>
     <v-text-field v-model="currSpace.title" :rules="[(v)=> !!v || 'Title is required']" label="Title" required > </v-text-field>
        <v-text-field v-model="currSpace.desc" :rules="[(v)=> !!v || 'Description is required']" label="Description" required > </v-text-field>

    <v-divider class="my-5"></v-divider>
    <v-btn color="error" small class="mr-2" @click="deleteData">
        Delete </v-btn>
        <v-btn color="success" small @click="updateData" >
            Update </v-btn>
   </v-form>
   <p class="mt-3"> {{mess}} </p>
</div>
<div v-else>
    <p> mmmm</p>
    </div>

</template>

<script>
import DataSpaceService from "@/DataService";

export default {
    name: "dataspace",
    data(){
        return {
            currSpace: null,
            mess: "",
        };
    },
    methods:{
        getData(id){
            DataSpaceService.get(id).then((res)=> { this.currSpace=res.data; console.log(res.data);}).catch((e)=> { console.log(e)});
        },

    updateData(){
        DataSpaceService.update(this.currSpace.id, this.currSpace).then((res)=> {console.log(res.data); this.mess="updated!"}).catch((e)=> {console.log(e);});
    },
    deleteData(){
        DataSpaceService.delete(this.currSpace.id)
        .then((res)=> { console.log(res.data);
        this.$router.push({name: "dataspaces"});}).catch((e)=> {console.log(e)});
    },
    },
    mounted(){
        this.mess="",
        this.getData(this.$router.params.id);
    },
};


    
</script>