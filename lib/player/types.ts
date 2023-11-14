export type AudioState = {
  duration: number
  playing: boolean
  volume: number
}

export type Track = {
  id: string
  preview_url: string
  download_url: string
  file_name: string
  title: string
  artist: Artist
  download_url_mp3: string
  download_url_wav: string
  count: number
  mix: string
}

export type State = AudioState & {
  playlist: Playlist
  currentTrack: Track | null
  currentTrackIndex: number | null
}

export type Playlist = {
  id: string
  title: string
  image: string
  artist_name: string;
  tracks: Track[];
  description: string;
  imageUrl: string;
}

export type Artist = {
  id: string
  name: string
  imageUrl: string
  tracks: Track[]
}
