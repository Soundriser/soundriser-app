import { decryptFromMail} from '@lib/utils'
import { createClient } from '@supabase/supabase-js'

export default async function signalDownload(req, res) {
    if(req.method!=="POST"){
        return res.status(400).json({msg: "method now allowed"});
    }

    try {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE)

        const url_download = req?.body?.url;
        const slug_release = req?.body?.slug;
        const format = req?.body?.format;
        const track_id = req?.body?.track_id;
        const email = await decryptFromMail(req?.body?.email);
        const descryptedSlugObj = await decryptFromMail(slug_release);
        const descryptedSlug = Number(descryptedSlugObj)
    
        console.log("url_download", url_download)
        console.log("descryptedSlug", descryptedSlug)
        console.log("email", email)
        console.log("format", format)
        console.log("track_id", track_id)
    } catch (error) {
        return res.status(200).json({msg: "skip, email not valid"});
    }


    if(!url_download || !descryptedSlug || !email || !format || !track_id){
        return res.status(400).json({msg:"data not valid"});
    }

    await supabase.from('Download').insert({ email, "downloaded_at": new Date().toISOString(), format, track_id });
    return res.status(200).json({});
}
