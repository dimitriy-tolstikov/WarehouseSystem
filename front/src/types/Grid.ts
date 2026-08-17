import type {GridRenderCellParams} from "@mui/x-data-grid";
import type {TranslationKey} from "../i18n/translations";

// headerName — ключ перевода, в текст подставляет DataGridComponent
export type GridColumnType = {
    field: string,
    headerName: TranslationKey,
    width: number,
    renderCell?: (params: GridRenderCellParams) => React.ReactNode
}
