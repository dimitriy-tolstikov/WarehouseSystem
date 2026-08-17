import type {ItemComponentProps, ResourceEntity} from "../../types/Entities";
import PureTextInput from "../../components/pure/controls/PureTextInput";
import FieldComponent from "../../components/pure/controls/FieldComponent";
import {useTranslation} from "../../i18n/locale";


const ResourceItem = ({data, onChange}: ItemComponentProps<ResourceEntity>) => {

   const {t} = useTranslation();

   return (
       <>
           <FieldComponent name={t('common.name')} >
               <PureTextInput value={data?.name ?? ''} onChange={ (e) => onChange({...data!, name: e}) }
                          id={t('common.name')} placeholder={t('common.enterName')} />
           </FieldComponent>
       </>
   )
}

export default ResourceItem
