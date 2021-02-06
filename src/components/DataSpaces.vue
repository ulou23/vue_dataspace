<template>
<v-container class="grey lighten-5">
    <v-row class="mt-6" justify="center">
        <v-col cols="12" md="8" sm="6">
            <v-text-field v-model="title" label="Search by title"> </v-text-field>
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
            <v-pagination v-model="page" :length="totalPages" total-visible="6" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" @input="handleChange"> </v-pagination>
        </v-col>
    </v-row>
</v-col>
 
   

        <v-col cols="12" sm="12">
            <v-card class="pa-9" title>
                <v-card-title> Data Spaces</v-card-title>
                <v-data-table :headers="headers" :items="dataspaces" :hide-default-footer="true">
                    <template v-slot:[`item.actions`]="{item}">
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
            title: "",
    
              headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "desc", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveDataSpaces() {
      DataSpaceService.getAll()
        .then((response) => {
          this.dataspaces = response.data.map(this.getDisplay);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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

    searchT() {
      DataSpaceService.findBytitle(this.title)
        .then((response) => {
          this.dataspaces = response.data.map(this.getDisplay);
          console.log(response.data);
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
        title: dataspace.title.length > 30 ? dataspace.title.substr(0, 30) + "..." : dataspace.title,
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
        