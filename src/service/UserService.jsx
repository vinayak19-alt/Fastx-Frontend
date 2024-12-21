import axios from "axios";

class UserService{
    
    registerUser(user){
        return axios.post("http://localhost:8080/api/authenticate/register", user)
    }
    saveUserInfo(user){
        return axios.post("http://localhost:8080/api/authenticate/adduser", user)
    }
    loginUser(user){
        return axios.post("http://localhost:8080/api/authenticate/login", user)
    }
    selectJourney(date, source, destination, token){
        return axios({
            method:'get',
            url:'http://localhost:8080/api/saveuser/v1/getRoutes/'+date+'/'+source+'/'+destination,
            headers:{
                // 'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
    
    bookseats(bookingObject, token){
        return axios({
            method:'post',
            url:'http://localhost:8080/api/saveuser/v1/makeReservation',
            data:bookingObject,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
    getBookings(username, token){
        return axios({
            method:'get',
            url:'http://localhost:8080/api/saveuser/v1/getBookings/'+username,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
    cancelBooking(id, token){
        return axios({
            method:'post',
            url:'http://localhost:8080/api/saveuser/v1/cancelReservation/'+id,
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
export default new UserService();
