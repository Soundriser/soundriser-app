import FeatureCard from '@components/FeatureCard'
import { LeftArrowIcon } from '@components/Icons'
import { PlayListHeader } from '@components/Playlist/PlayListHeader'
import { TrackCard } from '@components/Playlist/TrackCard'
import { Button, Grid } from '@components/UI'
import player, { usePlayerState } from '@lib/player'
import { Playlist, Track } from '@lib/player/types'
import Link from 'next/link'

export interface props {
  playlist: Playlist
  className?: string
  handleDowload:(filename:string, format: "mp3" | "wav", track_id: number, trak_name: string, index: number)=>void;
  indexTrackLoading: number | null;
  formatTrackLoading: string | null;
}

const PlaylistView: React.FC<props> = (props) => {
  const { playlist, className, children, indexTrackLoading, formatTrackLoading, ...rest } = props

  const state = usePlayerState()

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
    console.log(state.playlist)
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
        <Link href="/">
          <Button variant="ghost">
            <LeftArrowIcon />
            Back to home
          </Button>
        </Link>
      </div>
      <Grid variant="B">
        <PlayListHeader
          playlist_id={playlist.id}
          img={playlist.image}
          title={playlist.title}
          artist_name={playlist?.artist_name}
          description={playlist.description}
          changePlaylist={() => handlePlay()}
        />
        <div className="flex flex-col gap-6">
          {playlist.tracks.map((track: Track, index: number) => {
            console.log({track})
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
          })}
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
