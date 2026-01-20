
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Correctly initialize GoogleGenAI with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateProductDescription(productName: string, category: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a premium, catchy, and professional e-commerce product description for a product named "${productName}" in the category "${category}". Keep it under 60 words.`,
      });
      // Fix: Access .text property directly
      return response.text || "No description generated.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while generating the description.";
    }
  },

  async suggestSmartPrice(productName: string, currentPrice: number): Promise<number> {
    try {
      // Fix: Use gemini-3-pro-preview for complex reasoning task like price suggestion
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Suggest a competitive price for "${productName}" currently priced at $${currentPrice}. Return ONLY the number.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestedPrice: { type: Type.NUMBER }
            },
            required: ["suggestedPrice"]
          }
        }
      });
      // Fix: Access .text property directly
      const data = JSON.parse(response.text.trim());
      return data.suggestedPrice;
    } catch (error) {
      return currentPrice;
    }
  }
};
