import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAIOptions } from "./openai";

export const geminiWithStream = async (
  input: string,
  openAiOptions: OpenAIOptions,
  onContent: (content: string) => void,
  onStop: () => void,
) => {
  const genAI = new GoogleGenerativeAI(openAiOptions.apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let result = "";
  const generationResult = await model.generateContentStream([input]);
  for await (const chunk of generationResult.stream) {
    const chunkText = chunk.text();
    console.log(`chunk: ${chunkText}`);
    result += chunkText;
    onContent(chunkText);
  }
  onStop();
  return result;
};
