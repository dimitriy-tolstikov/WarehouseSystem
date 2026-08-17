import createGridPage from "../../components/GridPageGenerator";
import {
    BALANCE_API_PATH, BALANCE_PAGE_ROUTE, RESOURCE_API_PATH, UNIT_API_PATH
} from "../../utils/consts";
import type {BalanceEntity} from "../../types/Entities";

const BalancePage = createGridPage<BalanceEntity>(BALANCE_API_PATH, BALANCE_PAGE_ROUTE, 'balance.title', 'Filters',
    [
        {field: 'resource', headerName: 'common.resource', width: 300, renderCell: (params) => (params.value as { name: string }).name },
        {field: 'unit', headerName: 'common.unit', width: 150, renderCell: (params) => (params.value as { name: string }).name },
        {field: 'quantity', headerName: 'common.quantity', width: 150},
    ], [
        {fieldName: 'Resource.Id', name: 'common.resource', type:'select', apiPath: RESOURCE_API_PATH },
        {fieldName: 'Unit.Id', name: 'common.unit', type:'select', apiPath: UNIT_API_PATH },
    ],
    false)

export default BalancePage
