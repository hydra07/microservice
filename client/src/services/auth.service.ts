import http from "./http";
import TokenService from "./token.service";

class AuthService{
    async loginWithDiscord(){
        console.log("loginWithDiscord");
        return http.get("/api/auth/discord")
            .then(res =>{
                console.log(res.data);
                return res.data;
            })
            .catch(err =>{
                console.log(err);
            });
    }
    // async loginWithDiscord(){
    //     return http.get("/api/auth/discord")
    //         .then(res =>{

    //             if(res.data.accessToken && res.data.refreshToken){
                   
    //                 TokenService.setUser(res.data);
    //             }
    //             console.log(res.data);
    //             return res.data;
    //         });
    // }

    async getUserData(){
        return http.get("/api/auth/protected", {
            withCredentials: true
        });
    }

    async logout(){
        TokenService.removeUser();
    }
}

export default new AuthService();