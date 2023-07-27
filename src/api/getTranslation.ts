import axios from "axios";
import { getSourceLanguage } from "./getSourceLanguage";
import he from "he";
import { GOOGLE_API_KEY } from "@/utils/constants";

export const getTranslation = async (text: string, target: string) => {
  try {
    if (typeof text !== "string") return;
    // Detecting the source language
    const detectSourceLanguage = await getSourceLanguage(text);

    const { data } = await axios({
      method: "POST",
      url: `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        q: text,
        target,
        source: detectSourceLanguage,
      },
    });
    const translateResult = he.decode(
      data.data.translations[0].translatedText
    ) as string;

    return {
      source: detectSourceLanguage,
      target,
      translateResult,
      originalText: text,
    };
  } catch (error) {
    console.error("Error: " + error);
  }
};
