import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// get specifiicy post
export const GET = async (req, { params }, res) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("prompt not found ", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something get wrong", { status: 500 });
  }
};

// update
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("prompt not found ", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something get wrong while updating", { status: 500 });
  }
};

// delete post

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("prompt has been deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something get wrong while deleting prompt", {
      status: 500,
    });
  }
};
