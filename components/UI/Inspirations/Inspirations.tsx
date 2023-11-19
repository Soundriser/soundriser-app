import s from './Inspirations.module.css'
import cn from 'clsx'
import CheckboxItem from '../CheckboxItem';
import { useGroups } from 'context/useGroups';
import { getEmailFromStorage } from '@lib/utils';

function Inspirations() {
  const email = getEmailFromStorage();
  const groups = useGroups(email);

  const groupIsChecked = (id:string) => !!groups?.data?.filter((d:any) => d?.id === id)?.length
  const ID_TECHNO = "epzNrN";
  const ID_HOUSE = "bq2OwG";
  const ID_TRANCE = "erYPyK";
  const ID_PSYCHEDELIC = "avjWKX";
  const ID_HARD = "dwkXMM";

  return(
    <form className={cn(s.root)}>
      <CheckboxItem value={ID_TECHNO} label="TECHNO" sub="peak time / driving / raw / deep / hypnotic / prog" checked={groupIsChecked(ID_TECHNO)} onClick={()=>{}}/>
      <CheckboxItem value={ID_HOUSE} label="HOUSE" sub="deep / tech / prog / organic / downtempo" checked={groupIsChecked(ID_HOUSE)} onClick={()=>{}}/>
      <CheckboxItem value={ID_TRANCE} label="TRANCE" sub="main / deep / tech / raw / hypnotic / prog" checked={groupIsChecked(ID_TRANCE)} onClick={()=>{}}/>
      <CheckboxItem value={ID_PSYCHEDELIC} label="PSYCHEDELIC" sub="trance / tech / prog" checked={groupIsChecked(ID_PSYCHEDELIC)} onClick={()=>{}}/>
      <CheckboxItem value={ID_HARD} label="HARD" sub="trance / techno / house / core / industrial" checked={groupIsChecked(ID_HARD)} onClick={()=>{}}/>
  </form>
  )
}

export default Inspirations
