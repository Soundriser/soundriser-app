import FeatureCard from '@components/FeatureCard'
import { LeftArrowIcon } from '@components/Icons'
import { PlayListHeader } from '@components/Playlist/PlayListHeader'
import { TrackCard } from '@components/Playlist/TrackCard'
import { Button, Grid } from '@components/UI'
import player, { usePlayerState } from '@lib/player'
import { Playlist, Track } from '@lib/player/types'
import Link from 'next/link'
import { useState } from 'react'

export interface props {
  playlist: Playlist
  className?: string
  handleDowload:(filename:string, format: "mp3" | "wav", track_id: number, trak_name: string, index: number)=>void;
  indexTrackLoading: number | null;
  formatTrackLoading: string | null;
  onSubmitFeedback:(text:string)=>void;
  artist: any;
}

const PlaylistView: React.FC<props> = (props) => {
  const { playlist, className, children, indexTrackLoading, artist, formatTrackLoading, onSubmitFeedback, ...rest } = props

  const state = usePlayerState()
  const [feedback, setFeedback] = useState("");
  const [feedbackIsSent, setFeedbackIsSent] = useState(false);

  const PlayTrack = (index: number) => {
    if (state.playing && index === state.currentTrackIndex) {
      player.pause()
    } else if (index !== state.currentTrackIndex) {
      player.playTrack(index)
      player.play()
    } else {
      player.play()
    }
  }

  const setQueue = (index?: number) => {
    if (index) {
      player.setQueue(playlist, index)
    } else {
      player.setQueue(playlist, 0)
    }
  }

  const handlePlay = (index?: number) => {
    if (state.playlist.id !== playlist.id) {
      // set Queue
      setQueue(index)
      player.play()
      return
    } else {
      // handle play
      PlayTrack(index || 0)
    }
  }

  return (
    <div>
      <div className="flex flex-col mb-8 items-start">
        {/* <Link href="/">
          <Button variant="ghost">
            <LeftArrowIcon />
            Back to home
          </Button>
        </Link> */}
      </div>
      <Grid variant="B">
        <PlayListHeader
          playlist_id={playlist.id}
          img={playlist.image}
          title={playlist.title}
          artist_name={playlist?.artist_name}
          description={playlist.description}
          changePlaylist={() => handlePlay()}
          artist={artist}
        />
        <div className="flex flex-col gap-6">
          {playlist.tracks.map((track: Track, index: number) => {
            return(
              <TrackCard
              onClick={() => handlePlay(index)}
              playlistId={playlist.id}
              title={track.title}
              fileUrl={track.preview_url}
              fileName={track.file_name}
              artist={track.artist.name}
              mix={track.mix}
              key={index}
              count={track.count}
              index={index}
              track_id={Number(track.id)}
              handleDownload={props?.handleDowload}
              download_url_wav={track.download_url_wav}
              download_url_mp3={track.download_url_mp3}
              indexTrackInPlaylist={index}
              indexTrackLoading={indexTrackLoading}
              formatTrackLoading={formatTrackLoading}
            />
            )
          }).concat([
              feedbackIsSent ? 
                <span className='mr-2 text-[14px] text-[#fea755]'>{"Thank you for your support 🚀"}</span>
              :
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your feedback (optional)</label>
                <textarea id="message" 
                value={feedback}
                onChange={(e)=>{
                  setFeedback(e?.target?.value);
                }}
                rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feedback is not required so write if you want to communicate something real to the artist"></textarea>
                
                  <button onClick={async()=>{
                    if(feedback){
                      onSubmitFeedback(feedback)
                      setFeedbackIsSent(true)
                    }
                  }} disabled={!!!feedback} type="button" 
                  className="mt-3 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#F99940] text-[#F99940] hover:bg-[#F99940] hover:text-black transition-all border-[#F99940] border-[1px] border-solid bg-transparent focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
                    Send
                  </button>
              </div>
          ])}
        </div>
      </Grid>
      <div className='grid mt-12'>
        <FeatureCard
          title="Playback Insights"
          description="Effortlessly track the exact sources where these songs are being played, providing invaluable data for a comprehensive understanding of audience reach."
          isNew={true}
          isWorkInProgress={true}
        />
        {/* <FeatureCard
          title="New Feature 1"
          description="This is an awesome new feature that you'll love!"
          isNew={true}
          isWorkInProgress={true}
        /> */}
      </div>
    </div>
  )
}

export default PlaylistView
