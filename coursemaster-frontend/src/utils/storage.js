export const storage = {
  saveUser(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUser() {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
