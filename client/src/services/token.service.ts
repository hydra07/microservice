
import { AuthState } from "CustomTypes";

import Cookies from "js-cookie";
class TokenService{

    getRefreshToken() {
        const user = this.getUser();
        return user?.refreshToken;
      }

      getAccessToken() {
        const user = this.getUser();
        return user?.accessToken;
      }

      updateRefreshToken(token: string) {
        const user = this.getUser();
        user.refreshToken = token;
        this.setUser(user);
      }
      updateAccessToken(token: string) {
        const user = this.getUser();
        user.accessToken = token;
        this.setUser(user);
      }

      getUser() {
        const userJson = Cookies.get('user');
        const user = userJson !== undefined ? JSON.parse(userJson) : {};
        return user;
      }

      setUser(user: AuthState) {
        console.log(JSON.stringify(user));
        Cookies.set('user', JSON.stringify(user));
      }
    
      removeUser() {
        Cookies.remove('user');
      }

}

export default new TokenService();