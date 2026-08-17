import createGridPage from "../../components/GridPageGenerator";
import type {ClientEntity} from "../../types/Entities";
import {CLIENT_API_PATH, CLIENT_PAGE_ROUTE} from "../../utils/consts";

const ClientPage = createGridPage<ClientEntity>(CLIENT_API_PATH, CLIENT_PAGE_ROUTE, 'client.listTitle', 'Archive',
    [
        {field:'name', headerName:'common.name', width: 300},
        {field:'address', headerName:'common.address', width: 300}
    ]);

export default ClientPage