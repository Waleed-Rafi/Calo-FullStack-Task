import axios from "axios";
import { UNSPLASH_BASE_URL, UNSPLASH_ACCESS_KEY } from "../config/appConfig";
import { logger } from "../logger/customerLogger";

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
    logger.info(`Fetched random image: ${randomImage}`);
    return randomImage;
  } catch (error) {
    logger.error(`Error fetching image from Unsplash: ${error}`);
    throw new Error("Failed to fetch image from Unsplash");
  }
};
