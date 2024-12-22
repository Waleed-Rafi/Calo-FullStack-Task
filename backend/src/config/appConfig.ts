module.exports = {
  PORT: process.env.PORT || 3000,
  UNSPLASH_BASE_URL: "https://api.unsplash.com/search/photos",
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY as string,
};
