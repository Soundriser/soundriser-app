import s from './Inspirations.module.css'
import cn from 'clsx'
import CheckboxItem from '../CheckboxItem';
import { useGroups } from 'context/useGroups';
import { getEmailFromStorage } from '@lib/utils';
import axios from 'axios';

function Inspirations() {
  const email = getEmailFromStorage();
  const {data,mutateGroups} = useGroups(email);

  const groupIsChecked = (id:string) => !!data?.filter((d:any) => d?.id === id)?.length
  const ID_TECHNO = "epzNrN";
  const ID_HOUSE = "bq2OwG";
  const ID_TRANCE = "erYPyK";
  const ID_PSYCHEDELIC = "avjWKX";
  const ID_HARD = "dwkXMM";
  const updateGroups = async(idNewGroup:string) => {
    try {
      let operation = "add";
      if(groupIsChecked(idNewGroup)){
        operation = "delete"
      }
      
      await axios.patch("/api/update-group",{
        email: getEmailFromStorage(),
        groupId: idNewGroup,
        operation
      })
    } catch (error) {
      
    } finally {
      mutateGroups();
    }
  }

  // 

  return(
    <form className={cn(s.root)}>
      <CheckboxItem value={ID_TECHNO} label="TECHNO" sub="peak time / driving / raw / deep / hypnotic / prog" checked={groupIsChecked(ID_TECHNO)} onClick={()=>{
        updateGroups(ID_TECHNO);
      }}/>
      <CheckboxItem value={ID_HOUSE} label="HOUSE" sub="deep / tech / prog / organic / downtempo" checked={groupIsChecked(ID_HOUSE)} onClick={()=>{
        updateGroups(ID_HOUSE);
      }}/>
      <CheckboxItem value={ID_TRANCE} label="TRANCE" sub="main / deep / tech / raw / hypnotic / prog" checked={groupIsChecked(ID_TRANCE)} onClick={()=>{
        updateGroups(ID_TRANCE);
      }}/>
      <CheckboxItem value={ID_PSYCHEDELIC} label="PSYCHEDELIC" sub="trance / tech / prog" checked={groupIsChecked(ID_PSYCHEDELIC)} onClick={()=>{
        updateGroups(ID_PSYCHEDELIC);
      }}/>
      <CheckboxItem value={ID_HARD} label="HARD" sub="trance / techno / house / core / industrial" checked={groupIsChecked(ID_HARD)} onClick={()=>{
        updateGroups(ID_HARD);
      }}/>
  </form>
  )
}

export default Inspirations
