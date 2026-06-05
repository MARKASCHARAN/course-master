import { storage } from "./storage";

const API_BASE = "http://localhost:6001/api";

async function get(url) {
  const token = storage.getToken();
  console.log("TOKEN SENT:", token);

  const res = await fetch(API_BASE + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return res.json();
}

async function post(url, data) {
  const token = storage.getToken();
  console.log("TOKEN SENT:", token);

  const res = await fetch(API_BASE + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export default { get, post };
