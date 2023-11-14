import axios from "axios";

export default async function wavDwnl(req:any, res:any) {
    if(req.method!=="POST"){
        return res.status(400).json({msg: "method now allowed"});
    }
    const url_download = req?.body?.url_download;
    if(!url_download){
        return res.status(400).json({msg:"data not valid"});
    }

      // Use axios to download the file
    const response = await axios({
        method: 'get',
        url: url_download,
        responseType: 'stream',
    });

    // Save the file locally or process it as needed
    response.data.pipe(require('fs').createWriteStream('downloaded-file.wav'));

    return res.status(200).json({url_download});
}
