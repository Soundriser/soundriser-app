import { useRouter } from "next/router";

const Footer = () => {
    const router = useRouter();
    return(
        <footer className="flex text-[14px] text-[#a1a796] items-center justify-center mt-[96px] py-3 bg-slate-800">
            <span>{"Soundriser © 2023"}</span>
            <a className="ml-4 underline" href={`/privacy?${Object.keys(router.query).map((k)=>`${k}=${router.query[k]}`).join("&")}`} target={"_blank"}>{"Privacy"}</a>
            <a className="ml-4 underline" href={`/cookie?${Object.keys(router.query).map((k)=>`${k}=${router.query[k]}`).join("&")}`} target={"_blank"}>{"Cookie Policy"}</a>
        </footer>
    )
}
export default Footer;