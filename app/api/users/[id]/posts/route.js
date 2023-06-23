import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const GET = async (req, { params }, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something get wrong", { status: 500 });
  }
};
