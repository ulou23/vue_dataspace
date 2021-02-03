<template>
  <v-app>
    <v-app-bar app dark>
   
  
      <div class="d-flex pa-2">
        DataSpaces HUB </div>
        <v-btn to="/dataspaces" text> DataSpaces
        </v-btn>
        <v-btn to="/add" text> Add Space </v-btn>    
        <div class="d-flex justify-sm-end">
    <v-btn to="/love"> Love</v-btn></div>
    </v-app-bar>
    <v-main>
    
   
<router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: function() {
    return{
    propertyname: "love",
    items: ["ab", "ccc"] }
  },
    beforeCreate: function(){
    console.log("created");
  },
  
  created: function(){
    console.log("created");
  }
};
</script>
