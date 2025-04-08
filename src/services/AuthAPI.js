export class AuthAPI {
  static BASE_URL = "http://localhost:3000";
  static API_URL = `${this.BASE_URL}/api/v1`;

  static storeToken(token) {
    localStorage.setItem('accessToken', btoa(token)); // Base64 encode for simple obfuscation
  }

  static getToken() {
    const token = localStorage.getItem('accessToken');
    return token ? atob(token) : null;
  }

  static clearToken() {
    localStorage.removeItem('accessToken');
  }

  static async fetchUser() {
    const token = this.getToken();
    console.log(token)
    if (!token) return null;

    try {
      const response = await fetch(`${this.API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${this.BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const token = response.headers.get('Authorization')?.split(' ')[1];
      
      if (!token) {
        throw new Error("Token not found in response headers");
      }

      this.storeToken(token);
      return this.fetchUser(); // Immediately fetch the user data
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
