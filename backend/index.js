import dotenv from "dotenv";
import connectDb from "./src/db/db.js";
import {app} from "./src/app.js";

dotenv.config({
    path: "./.env"

});

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on port", process.env.PORT);
    });
})
.catch(error => console.error(error));