import type {DashboardOperationDto} from "../../../types/Dashboard";
import {useTranslation} from "../../../i18n/locale";

type OperationsListProps = {
    operations: Array<DashboardOperationDto>
}

const formatQuantity = (quantity: number) =>
    (quantity > 0 ? '+' : '') + quantity.toLocaleString('ru-RU');

const OperationsList = ({operations}: OperationsListProps) => {

    const {t} = useTranslation();

    return (
        <div className='dashboard__card dashboard__operations'>
            <div className='dashboard__card-title'>{t('dashboard.lastOperations')}</div>
            <div className='dashboard__operations-list'>
                {
                    operations.map((op, i) =>
                        <div key={i} className='dashboard__operation'>
                            <span className={'dashboard__operation-dot ' +
                                (op.quantity >= 0 ? 'dashboard__operation-dot--in' : 'dashboard__operation-dot--out')}/>
                            <span className='dashboard__operation-text'>
                                {formatQuantity(op.quantity)} · {op.resourceName}
                            </span>
                        </div>
                    )
                }
                {
                    operations.length === 0 &&
                    <div className='dashboard__empty'>{t('dashboard.noOperations')}</div>
                }
            </div>
        </div>
    )
}

export default OperationsList
