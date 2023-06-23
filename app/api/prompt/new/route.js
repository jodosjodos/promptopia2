import { connectToDB } from "@utils/database"
import  Prompt from "@models/prompt"
export const POST =async(req,res)=>{
console.log(req.body);
    const {userId,prompt,tag}=await req.json()
// console.log(userId,prompt,tag);
    try {
        await connectToDB()

        const newPrompt=await Prompt({
            creator:userId,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response (JSON.stringify(newPrompt),{
            status:201
        })

        
    } catch (error) {
        console.log(error);
        return new Response("failed to create a new prompt",{status:500})
    }
}