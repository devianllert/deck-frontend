import axios from "axios";

const api = axios.create({
  baseURL: "https://deck.ru.com:3000"
});

export default api;
