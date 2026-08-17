import type {
    ItemComponentProps,
    ResourceEntity,
    UnitEntity,
    ClientEntity, ShipmentEntity, ShipmentItemEntity
} from "../../types/Entities";
import PureTextInput from "../../components/pure/controls/PureTextInput";
import PureDateInput from "../../components/pure/controls/PureDateInput";
import FieldComponent from "../../components/pure/controls/FieldComponent";
import {useContext, useEffect, useState} from "react";
import {
    BALANCE_API_PATH,
    CLIENT_API_PATH,
    RESOURCE_API_PATH,
    SHIPMENT_API_PATH,
    SHIPMENT_PAGE_ROUTE,
    UNIT_API_PATH
} from "../../utils/consts";
import ItemsGridComponent from "../../components/pure/ItemsGridComponent";
import {ModalContext} from "../../context/ModalContext";
import PureSelectInput from "../../components/pure/controls/PureSelectInput";
import {Button} from "react-bootstrap";
import {CheckCheck, Save, Trash2, Undo2} from "lucide-react";
import {createItemApi} from "../../api/Api";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {gridKey, itemKey, useSelectOptions} from "../../api/queries";
import {validateDocument} from "../../utils/validation";
import {useTranslation} from "../../i18n/locale";

type ShipmentButtonsCode = 'save' | 'approve' | 'disApprove' | 'delete';

const ShipmentItem = ({data, id, onChange}: ItemComponentProps<ShipmentEntity>) => {

    const {t} = useTranslation();

    const mContext = useContext(ModalContext)
    const queryClient = useQueryClient()

    const [nextId, setNextId] = useState<number>(-1)

    const {data: optionsResource = []} = useSelectOptions<ResourceEntity>(RESOURCE_API_PATH)
    const {data: optionsUnit = []} = useSelectOptions<UnitEntity>(UNIT_API_PATH)
    const {data: optionsClient = []} = useSelectOptions<ClientEntity>(CLIENT_API_PATH)

    const [buttons, setButtons] = useState<Array<ShipmentButtonsCode>>([]);

    const {save, changeState, deleteItems} = createItemApi<ShipmentEntity>(SHIPMENT_API_PATH, mContext, 'Edit');
    const navigate = useNavigate()

    // После мутаций обновляем списки отгрузок и баланс (подписание меняет остатки)
    const invalidateQueries = (withBalance: boolean = false) => {
        queryClient.invalidateQueries({queryKey: gridKey(SHIPMENT_API_PATH)})
        queryClient.invalidateQueries({queryKey: itemKey(SHIPMENT_API_PATH)})
        if (withBalance)
            queryClient.invalidateQueries({queryKey: gridKey(BALANCE_API_PATH)})
    }

    // Перед сохранением проверяем заполненность документа
    const validate = (): boolean => {
        if (data === undefined)
            return false;
        const error = validateDocument({number: data.number, date: data.date, items: data.shipmentItems});
        if (error !== null) {
            mContext?.setModal({header: t('common.error'), content: error, buttonText: t('common.ok'),
                onClose: () => mContext?.setModal(null)})
            return false;
        }
        return true;
    }

    useEffect(() => {
        if(id === 0) {
            setButtons(['save', 'approve']);
        }
        else if (data?.isApprove)
        {
            setButtons(['disApprove'])
        }
        else if (data !== undefined)
        {
            setButtons(['save', 'approve', 'delete'])
        }
        else
        {
            setButtons([])
        }
    }, [data, id])

    const buttonsTemplate: Array<{ code: ShipmentButtonsCode, className: string, variant: string, text: string, icon: React.ReactNode, onClick: () => void}> = [
        {code: 'save', className: 'me-2', variant: 'outline-dark', text: t('common.save'), icon: <Save size={16} />, onClick: () => {
                if (!validate()) return;
                save(data!).then(res => {
                    if(res !== (id ?? 0) && res !== undefined )
                        navigate(SHIPMENT_PAGE_ROUTE + '/' + res);
                    else if(res !== undefined) navigate(SHIPMENT_PAGE_ROUTE)
                    if (res !== undefined) invalidateQueries();
                } )
            } },
        {code: 'approve', className: 'me-2', variant: 'outline-success', text: t('shipment.saveAndApprove'), icon: <CheckCheck size={16} />, onClick: () => {
                if (!validate()) return;
                save(data!).then(res => {
                        if (res !== undefined) changeState(res, 'approve')
                            .then(() => { onChange({...data!, isApprove: true}); invalidateQueries(true); })
                    }
                )
            } },
        {code: 'disApprove', className: 'me-2', variant: 'outline-dark', text: t('shipment.revoke'), icon: <Undo2 size={16} />, onClick: () => {
                changeState(id, 'disApprove')
                    .then(() => { onChange({...data!, isApprove: false}); invalidateQueries(true); } )
            } },
        {code: 'delete', className: '', variant: 'outline-danger', text: t('common.delete'), icon: <Trash2 size={16} />, onClick: () => {
                mContext?.setModal({
                    header: t('shipment.deleteTitle'),
                    content: t('shipment.deleteConfirm', {number: data?.number ?? ''}),
                    buttonText: t('common.delete'),
                    cancelText: t('common.cancel'),
                    onClose: () => {
                        mContext?.setModal(null);
                        deleteItems(id).then(() => { invalidateQueries(); navigate(SHIPMENT_PAGE_ROUTE); });
                    },
                    onCancel: () => mContext?.setModal(null)
                })
            }},
    ]

   return (
       <>
           <div className='page-toolbar mb-3'>
               {buttonsTemplate?.map(b => {
                       const button = buttons.find(x => x === b.code);
                       if (button)
                           return <Button key={b.code} className={b.className} variant={b.variant}
                                          onClick={() => b.onClick()}>{b.icon}{b.text}</Button>
                       else
                           return null;
                   }
               )}
           </div>
           <FieldComponent name={t('common.number')} >
               <PureTextInput value={data?.number ?? ''} onChange={ (e) => onChange({...data!, number: e}) }
                          id={t('common.number')} placeholder={t('common.enterNumber')} />
           </FieldComponent>
           <FieldComponent name={t('common.date')} >
               <PureDateInput value={data?.date} onChange={ (e) => { onChange({...data!, date: e}) } } />
           </FieldComponent>
           <FieldComponent name={t('common.client')} >
               <PureSelectInput options={optionsClient} onChange={(e) => { onChange({...data!, clientId: +e})} }
                                selected={{value:data?.clientId?.toString() ?? '', title: data?.clientName ?? t('filter.notSelected')}}
               />
           </FieldComponent>
           <ItemsGridComponent<ShipmentItemEntity> items={data?.shipmentItems ?? []}
                               onChange={(items) => {onChange({...data!, shipmentItems: items})}}
                               nextId={nextId} setNextId={(id) => {setNextId(id)}}
                               columns={[
                                   {id: 'resource', type: 'select', title: t('common.resource'), field: 'resourceId', source: 'resource', options: optionsResource},
                                   {id: 'unit', type: 'select', title: t('common.unit'), field: 'unitId', source: 'unit', options: optionsUnit},
                                   {id: 'quantity', type: 'number', title: t('common.quantity'), field: 'quantity', options: []},
                               ]} />
       </>
   )
}

export default ShipmentItem
