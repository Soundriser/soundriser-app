import { decryptFromMail } from "@lib/utils";
import axios from "axios";

export default async function getGroups(req:any, res:any) {
    if(req.method!=="GET"){
        return res.status(400).json({msg: "method now allowed"});
    }
    let email = req?.query?.email;
    if(!email){
        return res.status(400).json({msg:"email not valid"});
    }
    email = await decryptFromMail(email);

      // Use axios to download the file
    const resp = await axios({
        method: 'get',
        url: `https://api.sender.net/v2/subscribers/${email}`,
        headers:{
            Authorization: `Bearer ${process.env.SENDER_API_KEY}`
        }
    });

    return res.status(200).json({data: resp?.data?.data?.subscriber_tags});
}
