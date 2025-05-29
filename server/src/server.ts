import app from "./app";
import config from "./config/config";

// Check for OpenAI API key on server startup
if (!config.openAiApiKey) {
  console.warn("OpenAI API key not found. Server will return dummy questions.");
}

app.listen(config.port, () => {
  console.log(`Server started running on port ${config.port}`);
});
