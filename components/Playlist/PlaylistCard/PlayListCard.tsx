import Image from 'next/image'
import Link from 'next/link'
import s from './PlaylistCard.module.css'
import cn from 'clsx'
import { Button } from '../../UI'
import { PlayIcon, PlayingIcon } from '@components/Icons'
import { usePlayerState } from '../../../lib/player'

export interface props {
  id: string
  img: string
  title: string
  className?: string
  c:string;
  isSmall:boolean;
  artist_name:string;
  generi: string;
  hidePlay?:boolean;
}

const PlaylistCard: React.FC<props> = (props) => {
  const { id, img, title, className, children, c, isSmall, artist_name, generi, hidePlay, ...rest } = props
  const state = usePlayerState()
  const linkRelease = `/playlist/${encodeURIComponent(id)}?c=${c}`;
  return (
    <div className={cn(s.root)}>
      <Link href={linkRelease}>
        <a>
          <Image className={`${cn(s.img)} ${isSmall ? cn(s.small) : ""}`} height={isSmall ? 256 : 1024} width={1024} src={img}/>
        </a>
      </Link>
      <div className={cn(s.cardInfo)}>
        <div className={cn(s.content_info)}>
          <h1 className={cn(s.title)}>{title}</h1>
          <h2 className={cn(s.artist_name)}>{artist_name}</h2>
          <p>{generi?.split(",")?.map((gn)=>{
            return(<span className={cn(s.genere)}>{`#${gn}`}</span>)
          })}</p>
        </div>
        {state.playing && state.playlist.id === id ? (
          <Link href={linkRelease}>
            <Button variant="ghost">
              <PlayingIcon />
              Playing now
            </Button>
          </Link>
        ) : !hidePlay && (
          <Link href={linkRelease}>
            <Button>
              <PlayIcon />
              Listen Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
export default PlaylistCard
