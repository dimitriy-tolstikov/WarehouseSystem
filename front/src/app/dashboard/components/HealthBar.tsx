import {useEffect, useState} from "react";
import {getHealth} from "../../../api/dashboardApi";
import {useTranslation} from "../../../i18n/locale";

type HealthState =
    { status: 'loading' } |
    { status: 'ok', text: string } |
    { status: 'error', text: string };

const HealthBar = () => {

    const {t} = useTranslation();

    const [health, setHealth] = useState<HealthState>({status: 'loading'});

    useEffect(() => {
        getHealth()
            .then(text => setHealth({
                status: 'ok',
                text: text === 'Healthy' ? t('dashboard.healthOk') : text
            }))
            .catch((e) => setHealth({status: 'error', text: (e as unknown as Error).message}));
    }, [t])

    return (
        <div className={'dashboard__health ' +
            (health.status === 'error' ? 'dashboard__health--error' : 'dashboard__health--ok')}>
            <span className={'dashboard__health-dot ' +
                (health.status === 'error' ? 'dashboard__health-dot--error' : 'dashboard__health-dot--ok')}/>
            <span className='dashboard__health-text'>
                {
                    health.status === 'loading' ? t('dashboard.healthCheck') :
                    health.status === 'ok' ? health.text :
                    t('dashboard.serviceUnavailable', {error: health.text})
                }
            </span>
        </div>
    )
}

export default HealthBar
