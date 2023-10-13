import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
   const { vibe, bio, name } = await req.json();
   console.log({ vibe, name, bio });
   const content = `
   Generate 2 lines for a dating app message labeled "1." and "2.". Each line should be less than 160 characters, casual, meaningful, and not too intense. The context for the person reciving the message is: ${bio}${bio.slice(-1) === '.' ? '' : '.'}
   ${
       vibe === 'Song'
       ? `The lines shoule rhyme like a poem or song, incorporating either the name: ${name} or the above context.`
       : vibe === 'Opener'
       ? "The lines should be catchy openers with a hint of cheesiness."
       : vibe === 'Pun'
       ? `Craft a pun using the receiver's name: ${name}.`
       : ''
   }`
   
   // Ask OpenAI for a streaming completion given the prompt
   const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
         {
            role: "user",
            content: content,
         },
      ],
   });

   // Convert the response into a friendly text-stream
   const stream = OpenAIStream(response);
   // Respond with the stream
   return new StreamingTextResponse(stream);
}