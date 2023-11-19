import s from './Inspirations.module.css'
import cn from 'clsx'
import { useTheme } from 'next-themes'
import CheckboxItem from '../CheckboxItem';

function Inspirations() {
  const rootClassName = cn(s.root)

  const { theme, setTheme } = useTheme()
  return(
    <form className={cn(s.root)}>
      <CheckboxItem value="techno" label="TECHNO" sub="peak time / driving / raw / deep / hypnotic / prog" checked={false} onClick={()=>{}}/>
      <CheckboxItem value="house" label="HOUSE" sub="deep / tech / prog / organic / downtempo" checked={false} onClick={()=>{}}/>
      <CheckboxItem value="trance" label="TRANCE" sub="main / deep / tech / raw / hypnotic / prog" checked={false} onClick={()=>{}}/>
      <CheckboxItem value="psychedelic" label="PSYCHEDELIC" sub="trance / tech / prog" checked={false} onClick={()=>{}}/>
      <CheckboxItem value="hard" label="HARD" sub="trance / techno / house / core / industrial" checked={false} onClick={()=>{}}/>
  </form>
  )
}

export default Inspirations
