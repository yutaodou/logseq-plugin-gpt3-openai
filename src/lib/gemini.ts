import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAIOptions } from "./openai";

export const geminiWithStream = async (
  input: string,
  openAiOptions: OpenAIOptions,
  onContent: (content: string) => void,
  onStop: () => void,
) => {
  const genAI = new GoogleGenerativeAI(openAiOptions.apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  let result = "";
  const generationResult = await model.generateContentStream([input]);
  for await (const chunk of generationResult.stream) {
    const chunkText = chunk.text();
    result += chunkText;
    onContent(chunkText);
  }
  onStop();
  return result;
};
