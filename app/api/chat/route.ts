import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { name, vibe, bio } = await req.json();
  // console.log(req.json())

  const content = `Generate 2 lines as a message to send on a dating app to someone i have matched with, without any hashtags and clearly labeled "1." and "2.". ${
    vibe === 'Song'
      ? `Make sure the 2 lines are from an actual song using the name ${name} in someway.`
      : ''
  }
  ${
    vibe === 'Opener'
      ? "Make sure the 2 lines are openning lines and a little cheezy."
      : ''
  }
  ${
    vibe === 'Pun'
      ? `Make sure the 2 lines are a good pun using the name of the message reciver: ${name}.`
      : ''
  }
    Make sure each generated line is less than 160 characters, is not too hardcore, is meanigful and a little casual, and base them on this context: ${bio}${
    bio.slice(-1) === '.' ? '' : '.'
  }`;

  // Log the content
  console.log("Generated Content:", content);

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: content,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
