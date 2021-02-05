import Love from './components/Love'
import HelloWorld from './components/HelloWorld'


export const routes= [
    {path: '/love',
    component: Love,
    name:"Love"
},
{path:'',
component:HelloWorld,
},
{path: '/dataspaces',
name: "dataspaces",
component: ()=> import("./components/DataSpaces")},
{
    path:'/dataspaces/:id',
    name: "dataspace-detail",
    component: ()=> import("./components/DataSpace") 
},
{
    path:'/add',
    name: 'add',
    component: ()=> import("./components/AddSpace")
}
];
