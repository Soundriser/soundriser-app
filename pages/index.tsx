import Head from 'next/head'
import { Grid } from '@components/UI'
import { About, ArtistCard } from '@components/common'
import { PlaylistCard } from '@components/Playlist/PlaylistCard'
import { createClient } from '@supabase/supabase-js'
import { encryptFromMail, getEmailFromStorage } from '@lib/utils'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE!)
  let { data: Releases } = await supabase.from('Releases').select("*").or(`draft.eq.false${process.env.NODE_ENV==="development" ? ",draft.eq.true" : ""}`).order("id",{"ascending":false})
  let { data: Artists } = await supabase.from('Artists').select("*").order("id",{"ascending":false})

  let AllReleases:any[] = [];
  for (const r of Releases||[]) {
    const id = await encryptFromMail(r.id);
    const artist_id = await encryptFromMail(r.artist_id)
    AllReleases.push({...r, id , artist_id });
  }

  let AllArtists:any[] = [];
  for (const a of Artists||[]) {
    const id = await encryptFromMail(a.id);
    AllArtists.push({...a, id });
  }
  const data = {
    Releases: AllReleases,
    Artists: AllArtists,
  }
  return {
    props: {
      data,
    }
  }
}

const Home = (props: { data: any; error: any }) => {
  const { data, ...rest } = props
  const [djEmail, setDjEmail] = useState("");
  useEffect(()=>{
    setDjEmail(getEmailFromStorage()||"")
  },[])
  return (
    <div>
      <Head>
        <title>Soundriser</title>
        <meta name="description" content="Soundriser | Quality music for real djs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <div className="col-span-2">
          <h1 className="text-2xl font-medium">Latest Album</h1>
          <div className="flex flex-col gap-16">
            {data.Releases.map((playlist: any, index:number) => {
              console.log({playlist})
              return(
                <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                img={playlist.image}
                c={djEmail}
                isSmall={index!==0}
                artist_name={playlist.artist_name}
                generi={playlist.generi}
              />
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-xl font-medium">Latest Artists</h1>
          <div className="flex flex-col gap-4">
            {data.Artists.map((artist: any) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                id={artist.id}
                imgUrl={artist.image}
              />
            ))}
          </div>
          <About />
        </div>
      </Grid>
    </div>
  )
}

export default Home
function cn(root: any): string | undefined {
  throw new Error('Function not implemented.')
}
