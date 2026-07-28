import axios from "axios";

const instance = axios.create({
  baseURL: "https://freesound.org/apiv2",
  params: {
    token: import.meta.env.VITE_FREESOUND_API_KEY,
  },
});

export async function getSoundById(id: number) {
  return instance.get(`/sounds/${id}/`);
}
