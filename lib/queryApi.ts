import openai from "./chatGpt";

export const query = async (
  prompt: string,
  chatId: string,
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
