import {Box, ThemeProvider} from "@mui/material";
import {getGridTheme} from "../style/GridTheme";
import {DataGrid} from "@mui/x-data-grid";
import {useMemo} from "react";
import {useThemeMode} from "../../theme/themeMode";
import PurePaginationComponent from "./PurePaginationComponent";
import type {PageView} from "../../types/PageView";
import type {GridColumnType} from "../../types/Grid";
import {useTranslation} from "../../i18n/locale";

type DataGridProps = {
    rows: Record<string, unknown>[],
    columns: GridColumnType[],
    pageView: PageView,
    onPageChange: (page: number) => void,
    onPageSizeChange: (size: number) => void,
    onItemOpen: (id: number) => void,
}

const DataGridComponent = ({rows, columns, pageView, onPageSizeChange, onPageChange, onItemOpen }: DataGridProps) => {
  const [mode] = useThemeMode();
  const gridTheme = useMemo(() => getGridTheme(mode), [mode]);
  const {t} = useTranslation();

  // headerName колонок приходит как ключ перевода — подставляем текст текущей локали
  const localizedColumns = columns.map(c => ({...c, headerName: t(c.headerName)}));

  return(
  <>
      <div className='w-100 flex-grow-1' style={{minHeight: 0}}>
          <ThemeProvider theme={gridTheme}>
              <Box className='d-flex' sx={{ height: '100%', width: '100%' }} >
                  <DataGrid rows={rows} columns={localizedColumns}
                             hideFooter rowHeight={36}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            onRowDoubleClick={(params) => onItemOpen(+(params.row.hrefId ?? params.row.id)) }
                            disableColumnFilter
                            disableColumnSorting
                            sortingMode={'server'}
                  />
              </Box>
          </ThemeProvider>
      </div>
      <PurePaginationComponent pageView={pageView} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} />
  </>
  )
}

export default DataGridComponent
