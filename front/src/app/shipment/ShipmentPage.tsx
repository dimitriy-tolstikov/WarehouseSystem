import createGridPage from "../../components/GridPageGenerator";
import {
    CLIENT_API_PATH, RESOURCE_API_PATH, SHIPMENT_API_PATH, SHIPMENT_PAGE_ROUTE, UNIT_API_PATH
} from "../../utils/consts";
import type {ShipmentEntity, ShipmentItemEntity} from "../../types/Entities";
import {t} from "../../i18n/locale";

type ShipmentGridRow = {
    id: string;
    number?: string;
    date?: Date;
    clientName?: string;
    isApprove?: boolean;
    resource?: string;
    unit?: string;
    quantity?: number;
    hrefId: number;
}

const ShipmentPage = createGridPage<ShipmentEntity>(SHIPMENT_API_PATH, SHIPMENT_PAGE_ROUTE, 'shipment.listTitle', 'Filters',
    [
        {field: 'number', headerName: 'common.number', width: 150},
        {field: 'date', headerName: 'common.date', width: 100},
        {field: 'clientName', headerName: 'common.client', width: 150},
        {field: 'isApprove', headerName: 'common.status', width: 150, renderCell:
                (params) => (params.value !== undefined ? <span className={'status-badge p-1 ps-2 pe-2 rounded-2 '
                    + (params.value ? 'status-badge--ok' : 'status-badge--neutral')}>{params.value ? t('shipment.approved') : t('shipment.notApproved')}</span> : null)},
        {field: 'resource', headerName: 'common.resource', width: 150},
        {field: 'unit', headerName: 'common.unit', width: 150},
        {field: 'quantity', headerName: 'common.quantity', width: 150},
    ], [
        {fieldName: 'Date', name: 'common.period', type:'date' },
        {fieldName: 'Id', name: 'common.number', type:'select', apiPath: SHIPMENT_API_PATH },
        {fieldName: 'Client.Id', name: 'common.client', type:'select', apiPath: CLIENT_API_PATH },
        {fieldName: 'ShipmentItems.Resource.Id', name: 'common.resource', type:'select', apiPath: RESOURCE_API_PATH },
        {fieldName: 'ShipmentItems.Unit.Id', name: 'common.unit', type:'select', apiPath: UNIT_API_PATH },
    ], true,
    (items) => {
        const rows: ShipmentGridRow[] = [];
        items.forEach(i => {
            if (i.shipmentItems && i.shipmentItems.length > 0) {
                let isFirst = true;
                i.shipmentItems.forEach((item: ShipmentItemEntity) => {
                    const base: ShipmentGridRow = {
                        id: i.id + 'ID' + item.id,
                        resource: item.resource?.name,
                        unit: item.unit?.name,
                        quantity: item.quantity,
                        hrefId: i.id
                    };
                    if (isFirst) {
                        rows.push({
                            ...base,
                            number: i.number,
                            date: i.date,
                            clientName: i.clientName,
                            isApprove: i.isApprove
                        });
                        isFirst = false;
                    } else {
                        rows.push(base);
                    }
                });
            } else {
                rows.push({
                    id: i.id.toString(),
                    number: i.number,
                    date: i.date,
                    clientName: i.clientName,
                    isApprove: i.isApprove,
                    hrefId: i.id
                });
            }
        });
        return rows;
    });

export default ShipmentPage
