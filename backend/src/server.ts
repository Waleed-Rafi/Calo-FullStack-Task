import dotenv from "dotenv";
dotenv.config();

import app from "./index";
import { PORT } from "./config/appConfig";

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
