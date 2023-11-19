import { decryptFromMail } from "@lib/utils";
import axios from "axios";

export default async function updateGroups(req:any, res:any) {
    if(req.method!=="PATCH"){
        return res.status(400).json({msg: "method now allowed"});
    }
    let email = req?.body?.email;
    const groupId = req?.body?.groupId;
    const operation = req?.body?.operation; // add or delete

    if(!email || !groupId){
        return res.status(400).json({msg:"data not valid"});
    }
    email = await decryptFromMail(email);

    let resp;

    if(operation==="add"){
        resp = await axios({
            method: 'post',
            url: `https://api.sender.net/v2/subscribers/groups/${groupId}`,
            data: JSON.stringify({
                "subscribers": [email],
                "trigger_automation": false
            }),
            headers:{
                Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
    }else{
        resp = await axios({
            method: 'delete',
            url: `https://api.sender.net/v2/subscribers/groups/${groupId}`,
            data: JSON.stringify({
                "subscribers": [email],
            }),
            headers:{
                "Authorization": `Bearer ${process.env.SENDER_API_KEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });  
    }

    return res.status(200).json({data: resp?.data});
}
