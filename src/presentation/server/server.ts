import { createApp } from "./app";
import { env } from "./config/env/env";

const app = createApp();
const PORT = env.PORT;

/**
 * Start Server
 */
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🔥 Server started at http://localhost:${PORT}`);
});
