<template>
<v-container class="grey lighten-5">
    <v-row class="mt-6" justify="center">
        <v-col cols="12" md="8" sm="6">
            <v-text-field v-model="searchT" label="Search by title"> </v-text-field>
        </v-col>
        <v-col cols="6" md="4">
              <v-btn small @click="page =1; retrieveDataSpaces();">Search </v-btn>
        </v-col>

<v-col cols="12" sm="12">
    <v-row>
        <v-col cols="4" sm="3">
            <v-select v-model="pageSize" :items="pageSizes" label="Spaces per Page" @change="handlePageSize" > </v-select>
        </v-col>
        <v-col cols="12" sm="9">
            <v-pagination v-model="page" :length="totalPages" total-visible="7" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handlePageChange"> </v-pagination>
        </v-col>
    </v-row>
</v-col>
 
   

        <v-col cols="12" sm="12">
            <v-card class="pa-9" tile>
                <v-card-title> Data Spaces</v-card-title>
                <v-data-table :headers="headers" :items="dataspaces" disable-pagination :hide-default-footer="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editData(item.id)">mdi-pencil </v-icon>
                        <v-icon small class="mr-2" @click="deleteData(item.id)">mdi-delete </v-icon>
                    </template>
                </v-data-table>

            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import DataSpaceService from "@/DataService"
export default {
    name: "data-list",
    data(){
        return{
            dataspaces:[],
            searchT: "",
    
              headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "desc", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page:1,
      totalPages:0,
      pageSize:3,
      pageSizes: [3,6,9],
    };
  },
  methods: {
      getReqParams(searchT,page,pageSize){
    let params={};
    if (searchT) {
        params["title"]=searchT;
    }  
    if (page) {
        params["page"]=page-1;
    }
    if (pageSize){
        params["size"]=pageSize;
    }
    return params;
      },
    retrieveDataSpaces() {
        const params=this.getReqParams(
            this.searchT,
            this.page,
            this.pageSize,
        );
      DataSpaceService.getAll(params)
        .then((response) => {
          const { dataspaces, totalPages } = response.data;
          this.dataspaces =dataspaces.map(this.getDisplay);
          this.totalPages=totalPages;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handlePageChange(value){
        this.page=value;
        this.retrieveDataSpaces();
       
    },
    handlePageSize(size){
         this.pageSize=size;
        this.page=1;
        this.retrieveDataSpaces();
    },

    refreshList() {
      this.retrieveDataSpaces();
    },

    removeAll() {
      DataSpaceService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },


    editData(id) {
      this.$router.push({ name: "dataspace-detail", params: { id: id } });
    },

    deleteData(id) {
      DataSpaceService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplay(dataspace) {
      return {
        id: dataspace.id,
        title: dataspace.title,
        desc: dataspace.desc,
      };
    },
  },
  mounted() {
    this.retrieveDataSpaces();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
        