import { decode as decodeBase64, encode as encodeBase64 } from 'js-base64';
const CryptoJS = require("crypto-js");

export function encryptFromMail(text:string) {
  const textStr = String(text)
  return encodeBase64(CryptoJS.AES.encrypt(textStr, process.env.MAIL_SECRET_KEY!).toString());
}

export async function decryptFromMail(text:string) {
  const fromBase64 = decodeBase64(text);
  return CryptoJS.AES.decrypt(fromBase64, process.env.MAIL_SECRET_KEY!).toString(CryptoJS.enc.Utf8);
}
  