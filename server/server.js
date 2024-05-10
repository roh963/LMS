import app from "./app.js";
import connectionTODb from "./config/dbConnection.js";

const port = process.env.PORT||3000;

app.listen(port,
   async  () => {
      await connectionTODb();
    console.log(`Server running on port ${port} 🔥`) 
}

);