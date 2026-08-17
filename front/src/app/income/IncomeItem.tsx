import type {
    ItemComponentProps,
    IncomeEntity,
    ResourceEntity,
    UnitEntity,
    IncomeItemEntity
} from "../../types/Entities";
import PureTextInput from "../../components/pure/controls/PureTextInput";
import PureDateInput from "../../components/pure/controls/PureDateInput";
import FieldComponent from "../../components/pure/controls/FieldComponent";
import {useState} from "react";
import {RESOURCE_API_PATH, UNIT_API_PATH} from "../../utils/consts";
import ItemsGridComponent from "../../components/pure/ItemsGridComponent";
import {useSelectOptions} from "../../api/queries";
import {useTranslation} from "../../i18n/locale";


const IncomeItem = ({data, onChange}: ItemComponentProps<IncomeEntity>) => {

    const {t} = useTranslation();

    const [nextId, setNextId] = useState<number>(-1)

    const {data: optionsResource = []} = useSelectOptions<ResourceEntity>(RESOURCE_API_PATH)
    const {data: optionsUnit = []} = useSelectOptions<UnitEntity>(UNIT_API_PATH)

   return (
       <>
           <FieldComponent name={t('common.number')} >
               <PureTextInput value={data?.number ?? ''} onChange={ (e) => onChange({...data!, number: e}) }
                          id={t('common.number')} placeholder={t('common.enterNumber')} />
           </FieldComponent>
           <FieldComponent name={t('common.date')} >
               <PureDateInput value={data?.date} onChange={ (e) => { onChange({...data!, date: e}) } } />
           </FieldComponent>
           <ItemsGridComponent<IncomeItemEntity> items={data?.incomeItems ?? []}
                               onChange={(items) => {onChange({...data!, incomeItems: items})}}
                               nextId={nextId} setNextId={(id) => {setNextId(id)}}
                               columns={[
                                   {id: 'resource', type: 'select', title: t('common.resource'), field: 'resourceId', source: 'resource', options: optionsResource},
                                   {id: 'unit', type: 'select', title: t('common.unit'), field: 'unitId', source: 'unit', options: optionsUnit},
                                   {id: 'quantity', type: 'number', title: t('common.quantity'), field: 'quantity', options: []},
                               ]} />
       </>
   )
}

export default IncomeItem
