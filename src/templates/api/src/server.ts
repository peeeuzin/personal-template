import { app } from "./app";

app.listen(4000 ?? process.env.PORT, () => {
    console.log("🚀");
});
