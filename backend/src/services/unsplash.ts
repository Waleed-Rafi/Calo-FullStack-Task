import axios from "axios";
const {
  UNSPLASH_BASE_URL,
  UNSPLASH_ACCESS_KEY,
} = require("../config/appConfig");

export const fetchRandomImageFromUnsplash = async (): Promise<string> => {
  try {
    const response = await axios.get(UNSPLASH_BASE_URL, {
      params: {
        query: "food",
        client_id: UNSPLASH_ACCESS_KEY,
      },
    });

    const images = response.data.results;
    if (images.length === 0) {
      throw new Error("No images found for the query 'food'");
    }

    const randomImage: string = images[0].urls.full;
    console.log(`Fetched random image: ${randomImage}`);
    return randomImage;
  } catch (error) {
    console.log(`Error fetching image from Unsplash: ${error}`);
    throw new Error("Failed to fetch image from Unsplash");
  }
};
