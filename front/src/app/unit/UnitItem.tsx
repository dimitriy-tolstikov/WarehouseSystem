import type {ItemComponentProps, UnitEntity} from "../../types/Entities";
import PureTextInput from "../../components/pure/controls/PureTextInput";
import FieldComponent from "../../components/pure/controls/FieldComponent";
import {useTranslation} from "../../i18n/locale";


const UnitItem = ({data, onChange}: ItemComponentProps<UnitEntity>) => {

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

export default UnitItem
