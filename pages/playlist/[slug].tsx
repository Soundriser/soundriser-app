import { Playlist } from '@lib/player/types'
import PlaylistView from '@components/Playlist/PlaylistView'
import { GetStaticPropsContext } from 'next'
import { createClient } from '@supabase/supabase-js'
import { decryptFromMail, encryptFromMail, getEmailFromStorage } from '@lib/utils'
import axios from "axios"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import admin from './../../lib/firebase'
import { BUCKET_URL } from '@lib/consts'
import Head from 'next/head'
import Script from 'next/script'
import Smartlook from 'smartlook-client'
import { PlaylistCard } from '@components/Playlist/PlaylistCard'

export async function getServerSideProps({params, query}:any) {
  const releaseId = params?.slug!
  const storage = admin.storage()
  const firebaseBucket = storage.bucket(BUCKET_URL);
  await firebaseBucket.setCorsConfiguration([
        {
          origin: [process.env.NODE_ENV==="development" ? 'http://localhost:3000' : "https://*.soundriser.app"],
          responseHeader: ['Content-Type'],
          method: ['GET', 'HEAD', 'DELETE'],
          maxAgeSeconds: 3600,
        },
      ]);

  console.log("[START_RELEASE] " + releaseId)
  const emailCurrentDj = await decryptFromMail(query?.c) 

  const slug = await decryptFromMail(releaseId) 
  const descryptedSlug = Number(slug);
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE!)
  let {data: Releases} = await supabase.from('Releases').select("*").eq("id", descryptedSlug)
  let {data: Tracks} = await supabase.from('Tracks').select("*").eq("release_id", descryptedSlug).order('id')
  let {data: OtherReleases} = await supabase.from('Releases').select("*").neq("id", descryptedSlug).or(`draft.eq.false${process.env.NODE_ENV==="development" ? ",draft.eq.true" : ""}`).order("id",{"ascending":false})

  let AllReleases:any[] = [];
  for (const r of OtherReleases||[]) {
    const id = await encryptFromMail(r.id);
    const artist_id = await encryptFromMail(r.artist_id)
    AllReleases.push({...r, id , artist_id });
  }

  let TracksDownloadable = []
  for (const Track of Tracks||[]) {
    const resultDwnl = await supabase.storage.from('music').createSignedUrls([`${Track.file_name}.mp3`,`${Track.file_name}.wav`], 3600, {download: true})
    const resultListen = await supabase.storage.from('music').createSignedUrls([`${Track.file_name}.mp3`], 3600, {download: false})
    const { count, error } = await supabase.from('Download').select('*', { count: 'exact' }).eq('track_id', Track.id)
    
    const filepathWav = `music/${Track.firebase_filename}`;
    const download_url_wav = await firebaseBucket.file(filepathWav).getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 10000, // URL expires in 10 minute
      
    });
    TracksDownloadable.push({...Track, count: count||0, download_url_mp3: resultDwnl?.data?.[0]?.signedUrl, download_url_wav: download_url_wav?.[0], preview_url: resultListen?.data?.[0]?.signedUrl})
  }
  const release = Releases?.[0];
  let {data: Artists} = await supabase.from('Artists').select("*").eq("id", release?.artist_id)
  const artist = Artists?.[0]

  const data = {
    AllReleases,
    emailCurrentDj,
    ...{slug: releaseId},
    artist: artist ? artist : {},
    playlist: {
      ...(release || {}),
      ...{id:null,artist_id:null},
      tracks: TracksDownloadable?.map(t => {
        return({...t,release_id:null, artist:{name:release.artist_name}})
      })
    }
  }
  return {
    props: {
      data
    },
  }
}


const Playlist = (props: { playlist: Playlist; data: any, slug: any, AllReleases:any }) => {
  const { playlist, data, slug, ...rest } = props
  const router = useRouter();
  const [indexTrackLoading, setIndexTrackLoading] = useState<number|null>(null);
  const [formatTrackLoading, setFormatTrackLoading] = useState<string|null>(null);
  const phrases = ["Where Music Speaks Louder Than Words","Exclusive Promo Service", "No Feedback Required"]
  const [indexPhrase, setIndexPhrase] = useState<number>(0);
  const artist = props?.data?.artist
  const [djEmail, setDjEmail] = useState("");

  console.log({props})
  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("c");
    if(email){
      sessionStorage.setItem("c",email||"")
      setDjEmail(email)
    }
  },[router.asPath])

  useEffect(() => {
    const setupUserSmartlook = async () => {
      try {
        const resultSL = await Smartlook.identify(props?.data?.emailCurrentDj, {
          "email": props?.data?.emailCurrentDj,
          "releaseTitle": data.playlist?.title,
          "releaseArtist": artist?.name
        })
      } catch (error) {
        console.log("[ERROR IDENTIFY SMARTLOOK]", error)
      }
    }
    setupUserSmartlook()
  }, [])

  useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setIndexPhrase(_ => {
        const currIndex = phrases.indexOf(phrases[_]);
        return currIndex===phrases?.length-1 ? 0 : phrases.indexOf(phrases[_])+1
      })
    }, 3000);
    return () => clearInterval(timer);
  }, []);


  return (
    <>
      <Head>
        <title>{`${data.playlist?.title} | Soundriser`}</title>
        <meta name="description" content={data.playlist?.description} />
        <link rel="icon" href="/favicon.ico" />
      <script>
        {
          `
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', 'd2e25cca4d10481315480e8194e4da691428cdab', { region: 'eu' });
          `
        }
      </script>

      <script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/e1fdd1c41235629d0f76a892/script.js"></script>       

      </Head>
      <h1 className='text-[36px] mb-8 flex items-baseline relative'><strong className='text-[#F99940]'>{"Soundriser"}</strong>
        <span className='font-light text-[16px] ml-2 text-[#6b755a]'>{phrases.map((text, index) => (
        <div
          key={index}
          className={`word hidden md:block absolute font-light opacity-100 transition-all delay-1000 bottom-[5px] pl-[5px] ${
            index === indexPhrase ? 'active' : ''
          }`}
        >
          {`${text}`}
        </div>
      ))}</span>
      </h1>
      <PlaylistView
      artist={artist}
      formatTrackLoading={formatTrackLoading}
      indexTrackLoading={indexTrackLoading}
      playlist={data.playlist}
      onSubmitFeedback={(feedback:string)=>{
        try {
          const email = getEmailFromStorage();
          axios.post("/api/send-feedback",{email, feedback, slug: data?.slug})
        } catch (error) {
          
        }
      }}
      handleDowload={async(url:string, format: "mp3" | "wav", track_id:number, track_name:string, index:number)=>{
        if(format==="mp3"){
          const link = document.createElement('a')
          link.href = url
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }else if(format==="wav"){
          try {
            setIndexTrackLoading(index)
            setFormatTrackLoading(format)
            await axios({ url: url, method: 'GET', responseType: 'blob' })
            .then((response) => {
              const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = blobUrl;
              link.setAttribute('download', track_name+".wav");
              document.body.appendChild(link);
              link.click();
            });

          } catch (error) {
            
          } finally {
            setIndexTrackLoading(null)
            setFormatTrackLoading(null)
          }
        }

        //DJ
        try {
          const email = getEmailFromStorage();
          axios.post("/api/signal-download",{url, slug: data?.slug, email, format, track_id})
        } catch (error) {
          //silent catch
        }
      }}></PlaylistView>

      {
        props?.data?.AllReleases?.length ?
      <div className="mt-10">
          <h1 className="text-2xl font-medium">Latest Album</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {props?.data?.AllReleases.map((playlist: any, index:number) => {
              console.log({playlist})
              return(
                <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                img={playlist.image}
                c={djEmail}
                isSmall={true}
                artist_name={playlist.artist_name}
                generi={playlist.generi}
                hidePlay={true}
              />
              )
            })}
          </div>
        </div>
        : null 
      }
    </>
  )
}

export default Playlist
