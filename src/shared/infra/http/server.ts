import { app } from "./app";

app.listen(3333, () => {
  console.log(
    `Server is running at http://localhost:3333
docs at http://localhost:3333/api-docs`
  );
});
