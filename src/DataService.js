import http from "/httpconn"

class DataSpaceService{
    getAll(){
        return http.get("/dataspaces")
    }

    get(id){
        return http.get(`/dataspaces/${id}`)
    }
    create(data){
        return http.post("/dataspaces", data)
    }

    update(id,data){
        return http.put(`/dataspaces/${id}`,data)
    }
    delete(id){
        return http.delete(`/dataspaces/${id}`)
    }
    deleteAll(){
        return http.delete(`/dataspaces`)
    }
    findBytitle(title){
        return http.get(`/dataspaces?title=${title}`)
    }
}

export default new DataSpaceService();