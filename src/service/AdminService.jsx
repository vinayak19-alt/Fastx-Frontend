import axios from "axios";

class AdminService{

    getAllUsers(token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/admin/v1/getAllUsers",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }
    deleteUser(id, token){
        return axios({
            method: 'delete',
            url: "http://localhost:8080/api/admin/v1/deleteUser/"+id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    getAllOperators(token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/admin/v1/getOperators",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }
    registerOperator(operator, token){
        return axios({
            method:'post',
            url:"http://localhost:8080/api/authenticate/register",
            data: operator,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    addOperator(operator, token){
        return axios({
            method:'post',
            url:"http://localhost:8080/api/authenticate/addBusOperator",
            data: operator,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    updateOperator(id, operator, token){
        return axios({
            method: 'put',
            url: "http://localhost:8080/api/admin/v1/updateOperator/"+id,  // Use the base URL directly
            data: operator,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });

    }
    getOperatorById(id, token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/admin/v1/getById/"+id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }
    deleteOperator(id, token){
        return axios({
            method: 'delete',
            url: "http://localhost:8080/api/admin/v1/deleteOperator/"+id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    getAllRoutes(token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/admin/v1/getAllRoutes",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }

}
export default new AdminService();