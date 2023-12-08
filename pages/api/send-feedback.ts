import { decryptFromMail} from '@lib/utils'
import { createClient } from '@supabase/supabase-js'

export default async function sednFeedback(req:any, res:any) {
    // if(req.method!=="POST"){
    //     return res.status(400).json({msg: "method now allowed"});
    // }

    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE!)
    try {
        const email = await decryptFromMail(req?.body?.email);
        const feedback = req?.body?.feedback;
        const slug_release = req?.body?.slug;
        const descryptedSlugObj = await decryptFromMail(slug_release);
        const descryptedSlug = Number(descryptedSlugObj)

    
        console.log("descryptedSlug", descryptedSlug)
        console.log("email", email)

        if(!feedback || !descryptedSlug || !email){
            return res.status(400).json({msg:"data not valid"});
        }

        await supabase.from('Feedback').insert({ email, "created_at": new Date().toISOString(), feedback, release_id: descryptedSlug });
        return res.status(200).json({});
    } catch (error) {
        return res.status(200).json({msg: "error"});
    }
}
