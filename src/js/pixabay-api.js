import axios from "axios";

const API_KEY = "41070058-40428010ccfde7f145f4a0888";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return {
      images: response.data.hits,
      total: response.data.totalHits,
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { images: [], total: 0 };
  }
}
