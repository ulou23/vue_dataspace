import axios from "axios";

class DataSpaceService{
    getAll(){
        return axios.get("http://localhost:3500/dataspaces")
    }

    get(id){
        return axios.get(`http://localhost:3500/dataspaces/${id}`)
    }
    create(data){
        return axios.post("/http://localhost:3500/dataspaces", data)
    }

    update(id,data){
        return axios.put(`http://localhost:3500/dataspaces/${id}`,data)
    }
    delete(id){
        return axios.delete(`http://localhost:3500/dataspaces/${id}`)
    }
    deleteAll(){
        return axios.delete(`http://localhost:3500/dataspaces`)
    }
    findBytitle(title){
        return axios.get(`http://localhost:3500/dataspaces?title=${title}`)
    }
}

export default new DataSpaceService();