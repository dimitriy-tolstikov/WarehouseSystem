import createGridPage from "../../components/GridPageGenerator";
import type {UnitEntity} from "../../types/Entities";
import {UNIT_API_PATH, UNIT_PAGE_ROUTE} from "../../utils/consts";

const UnitPage = createGridPage<UnitEntity>(UNIT_API_PATH, UNIT_PAGE_ROUTE, 'unit.listTitle','Archive',
    [
        {field:'name', headerName:'common.name', width: 300}
    ]);

export default UnitPage