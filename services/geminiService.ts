
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhanceProductDescription = async (productName: string, currentDesc: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك خبير مبيعات وتسويق، قم بتحسين وصف هذا المنتج باللغة العربية لجعله أكثر جاذبية للعملاء. 
      اسم المنتج: ${productName}
      الوصف الحالي: ${currentDesc}
      الرد يجب أن يكون الوصف الجديد فقط.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || currentDesc;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDesc;
  }
};

export const generateProductReview = async (productName: string): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت عميل اشترى هذا المنتج: "${productName}". اكتب مراجعة قصيرة وواقعية باللغة العربية تعبر عن الرضا عن الجودة.`,
        config: {
          temperature: 0.8,
        }
      });
      return response.text || "منتج رائع!";
    } catch (error) {
      return "منتج رائع!";
    }
  };
