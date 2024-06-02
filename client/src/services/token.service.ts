import { AuthState, User } from "CustomTypes";
import Cookies from "js-cookie";

class TokenService {
  saveToken = (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken, {
      secure: true,
      sameSite: "strict",
      expires: 1,
    });
    Cookies.set("refreshToken", refreshToken, {
      secure: true,
      sameSite: "strict",
      expires: 7,
    });
  };

  getUser = (): User | null => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    console.log("Retrieved accessToken:", accessToken);
    console.log("Retrieved refreshToken:", refreshToken);
    Cookies.set("test","abc");

    if (accessToken && refreshToken) {
      
      return { accessToken, refreshToken } as User;
    }

    return null;
  };

  getRefreshToken() {
    const user = this.getUser();
    return user?.refreshToken ?? null;

  }

  getAccessToken() {
    const user = this.getUser();
    return user?.accessToken ?? null;
  }

  updateRefreshToken(token: string) {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.saveToken(accessToken, token);
    }
  }

  updateAccessToken(token: string) {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.saveToken(token, refreshToken);
    }
  }

  setUser(user: AuthState) {
    // This method is not required for your current functionality.
    // Tokens should be managed by saveToken and getUser methods.
    console.log(JSON.stringify(user));
  }

  removeUser() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
}

export default new TokenService();
