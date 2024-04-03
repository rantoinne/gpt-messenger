import openai from "./chatGpt";

export const query = async (
  prompt: string,
  model: string,
) => {
  try {
    const res = await openai.completions.create({
      model,
      prompt,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const choice = res.choices[0];
    return choice;
  } catch (e) {
    throw new Error('Error found', {
      cause: JSON.stringify(e),
    });
  }
};

export const createImage = async (
  prompt: string,
) => {
  try {
    const response = await openai.images.generate({
      n: 1,
      prompt,
      size: "1024x1024",
      model: "dall-e-3",
    });
    const imageUrl = response.data[0].url
    console.log({ imageUrl });
    return imageUrl;
  } catch (e) {
    throw new Error('Error found', {
      cause: JSON.stringify(e),
    });
  }
};
