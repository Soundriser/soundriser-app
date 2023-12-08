import Image from 'next/image'
import s from './PlayListHeader.module.css'
import cn from 'clsx'
import { Button } from '../../UI'
import { PauseIcon, PlayIcon } from '@components/Icons'
import { usePlayerState } from '@lib/player'
import PlayerControls from '@components/Player/PlayerControls'
import { useState } from 'react'
import SoundcloudIcon from '@components/Icons/Soundcloud'
import BeatportIcon from '@components/Icons/BeatportIcon'
import InstagramIcon from '@components/Icons/InstagramIcon'
import SpotifyIcon from '@components/Icons/SpotifyIcon'

export interface props {
  playlist_id: string
  img: string
  title: string
  description: string
  artist_name: string
  className?: string
  changePlaylist: (id: string) => void
  artist:any;
}

const PlayListHeader: React.FC<props> = (props) => {
  const {
    playlist_id,
    img,
    title,
    artist,
    artist_name,
    className,
    children,
    description,
    changePlaylist,
    ...rest
  } = props

  const state = usePlayerState()
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className={cn(s.root)}>
      <div className="hidden sm:block">
        <Image height={1024} width={1024} src={img} className={cn(s.img)} />
      </div>
      <div className="block sm:hidden">
        <Image height={200} width={200} src={img} className={cn(s.img)} />
      </div>

      <h1 className={cn(s.title)}>{title}</h1>
      
      <div className='flex flex-col items-center'>
        <h2 className={cn(s.artist_name)}>{artist_name}</h2>
        <div className='flex items-center mt-4'>
          {
            artist?.soundcloud_url ?
            <a href={artist?.soundcloud_url} target={"_blank"} className='mx-2'><SoundcloudIcon/></a>
            :null
          }
          {
            artist?.instagram_url ?
            <a href={artist?.instagram_url} target={"_blank"} className='mx-2 flex items-center'><InstagramIcon/></a>
            :null
          }
          {
            artist?.spotify_url ?
            <a href={artist?.spotify_url} target={"_blank"} className='mx-2'><SpotifyIcon/></a>
            :null
          }
          {
            artist?.beatport_url ?
            <a href={artist?.beatport_url} target={"_blank"} className='mx-2 block'><BeatportIcon/></a>
            :null
          }
        </div>
      </div>

      <h3 className={cn(s.description)} onClick={()=>{setExpanded(_=>!_)}}>{(expanded || description?.length<=150) ? description : `${description?.substring(0, 150)}...`}</h3>

      {state.playlist.id === playlist_id ? (
        <PlayerControls layout="vertical" />
      ) : (
        <Button onClick={() => changePlaylist(playlist_id)}>
          <PlayIcon />
          Play
        </Button>
      )}
    </div>
  )
}

export default PlayListHeader
