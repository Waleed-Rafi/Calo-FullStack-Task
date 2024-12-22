require("dotenv").config();
const app = require("./index");
const { PORT } = require("./config/appConfig");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
