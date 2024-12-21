import axios from "axios";

class BusOperatorService{

    addBus(username, bus, token){
        return axios({
            method: 'post',
            url: "http://localhost:8080/api/busoperator/v1/addBus?username="+username,
            data: bus,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });

    }

    addRoute(route, token){
        return axios({
            method:'post',
            url:"http://localhost:8080/api/busoperator/v1/addRoute",
            data: route,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    getAllRoutes(token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/busoperator/v1/allRoutes",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });

    }
    getBusForOperator(username, token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/busoperator/v1/busForOperator/"+username,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }
    getBookingsForBus(id, token){
        return axios({
            method: 'get',
            url: "http://localhost:8080/api/busoperator/v1/getBookingsForBus/"+id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }
    cancelBooking(id, token){
        return axios({
            method:'post',
            url:"http://localhost:8080/api/busoperator/v1/cancelBookingByOperator/"+id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

}
export default new BusOperatorService();