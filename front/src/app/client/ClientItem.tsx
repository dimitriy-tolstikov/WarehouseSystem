import type {ClientEntity, ItemComponentProps} from "../../types/Entities";
import PureTextInput from "../../components/pure/controls/PureTextInput";
import FieldComponent from "../../components/pure/controls/FieldComponent";
import {useTranslation} from "../../i18n/locale";


const ClientItem = ({data, onChange}: ItemComponentProps<ClientEntity>) => {

    const {t} = useTranslation();

    return (
        <>
            <FieldComponent name={t('common.name')} >
                <PureTextInput value={data?.name ?? ''} onChange={ (e) => onChange({...data!, name: e}) }
                           id={t('common.name')} placeholder={t('common.enterName')} />
            </FieldComponent>
            <FieldComponent name={t('common.address')} >
                <PureTextInput value={data?.address ?? ''} onChange={ (e) => onChange({...data!, address: e}) }
                           id={t('common.address')} placeholder={t('common.enterAddress')} />
            </FieldComponent>
        </>
    )
}

export default ClientItem
