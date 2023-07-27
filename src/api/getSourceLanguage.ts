import axios from "axios";
import { GOOGLE_API_KEY } from "@/utils/constants";

export const getSourceLanguage = async (text: string) => {
  try {
    const { data } = await axios({
      url: `https://translation.googleapis.com/language/translate/v2/detect?key=${GOOGLE_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        q: text,
      },
    });

    return data.data.detections[0][0].language;
  } catch (error) {
    console.error("Error: " + error);
  }
};
