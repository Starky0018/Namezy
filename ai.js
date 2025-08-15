const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateAdvancedNames(keywords, style) {
  const prompt = `Generate 10 unique, catchy, and brandable startup names for a business with keywords: "${keywords}". Style: ${style}. Only list the names, no extra text.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
    temperature: 0.85,
  });
  // Parse response into clean array of names
  return response.data.choices[0].text
    .split('\n')
    .map(x => x.trim())
    .filter(x => x.length > 2);
}

module.exports = { generateAdvancedNames };