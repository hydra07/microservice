import http from "./http";
import TokenService from "./token.service";

class AuthService{
    async loginWithDiscord(){
        return http.get("/api/auth/discord")
            .then(res =>{

                if(res.data.accessToken && res.data.refreshToken){
                    TokenService.setUser(res.data);
                }

                return res.data;
            });
    }

    async logout(){
        TokenService.removeUser();
    }
}

export default new AuthService();