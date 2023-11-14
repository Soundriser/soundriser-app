import React, { ButtonHTMLAttributes, JSXElementConstructor } from 'react'
import { usePlayerState } from '@lib/player'
import { CheckIcon, DownIcon, PlayIcon, PlayingIcon, VolumeIcon } from '@components/Icons'
import cn from 'clsx'
import s from './TrackCard.module.css'
import Mp3DownloadIcon from '@components/Icons/Mp3Download'
import WavDownloadIcon from '@components/Icons/WavDownload'
import { createClient } from '@supabase/supabase-js'
import DownloadIcon from '@components/Icons/Download'
import PlayRoundedIcon from '@components/Icons/PlayRoundedIcon'
import Spinner from '@components/Spinner'

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  track_id: number
  fileUrl: string
  artist: string
  index: number
  fileName: string
  playlistId: string
  download_url_wav: string,
  download_url_mp3: string,
  count: number,
  mix: string,
  handleDownload: (filename:string, format: "mp3" | "wav", track_id: number, track_name: string, index: number) => void;
  Component?: string | JSXElementConstructor<any>
  indexTrackInPlaylist: number;
  indexTrackLoading: number | null;
  formatTrackLoading: string | null;
}

const TrackCard: React.FC<props> = (props) => {
  const {
    playlistId,
    title,
    track_id,
    fileUrl,
    artist,
    index,
    fileName,
    download_url_mp3,
    download_url_wav,
    count,
    mix,
    indexTrackInPlaylist,
    indexTrackLoading,
    formatTrackLoading,
    handleDownload,
    Component = 'button',
    ...rest
  } = props

  const state = usePlayerState()

  const rootClassName = cn(s.root, {
    [s.active]:
      state.currentTrackIndex === index && playlistId === state.playlist.id,
  })

  return (
    <Component className={rootClassName} {...rest}>
      <div className={cn(s.details)}>
        <p className={cn(s.title)}>{`${title}`}</p>
        <p className={cn(s.artist)}>{artist}</p>
        <p className={cn(s.mix)}>{mix ? `(${mix})` : ""}</p>

        <div style={{display:"flex", alignItems:"center"}}>
          {/* <div style={{display:"flex", alignItems:"center"}}>
            <PlayRoundedIcon/>
            <span className={cn(s.download)}>{count}</span>
          </div> */}

          <div style={{display:"flex", alignItems:"center"}}>
            <DownloadIcon/>
            <span className={cn(s.download)}>{count}</span>
          </div>
        </div>
      </div>
      <div className={cn(s.icon)} onClick={async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        handleDownload(download_url_wav,"wav", track_id, fileName, index)
      }}>
        {
          (indexTrackInPlaylist===indexTrackLoading && formatTrackLoading==="wav") ? <Spinner/> : <WavDownloadIcon  />
        }
      </div>
      <div className={cn(s.icon)} onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        handleDownload(download_url_mp3,"mp3", track_id, fileName, index)
      }}>
        {
          (indexTrackInPlaylist===indexTrackLoading && formatTrackLoading==="mp3")  ? <Spinner/> : <Mp3DownloadIcon  />
        }
      </div>
      <div className={cn(s.icon)}>
        {playlistId === state.playlist.id &&
        state.currentTrackIndex === index &&
        state.playing ? (
          <PlayingIcon />
        ) : (
          <PlayIcon />
        )}
      </div>
    </Component>
  )
}

export default TrackCard
