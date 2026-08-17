import {Button} from "react-bootstrap";
import type {ReactNode} from "react";
import {Archive, ArchiveRestore, Save, Trash2} from "lucide-react";
import {useTranslation} from "../../i18n/locale";

export type ItemButtonCode = 'save' | 'delete' | 'archiveToggle';

type EntityCardProps = {
    title: string,
    buttons: Array<{ code: ItemButtonCode, onClick: () => void }>,
    Component: ReactNode,
    isArchive: boolean | undefined,
    hideButtons: boolean
}

const EntityCardComponent = ({title, buttons, Component, isArchive, hideButtons} : EntityCardProps) => {

    const {t} = useTranslation();

    const buttonsTemplate: Array<{ code: ItemButtonCode, variant: string, text: string, icon: ReactNode}> = [
        {code: 'save', variant: 'outline-success', text: t('common.save'), icon: <Save size={16} /> },
        {code: 'archiveToggle', variant: 'outline-secondary', text: isArchive ? t('common.unarchive') : t('common.archive'),
            icon: isArchive ? <ArchiveRestore size={16} /> : <Archive size={16} /> },
        {code: 'delete', variant: 'outline-danger', text: t('common.delete'), icon: <Trash2 size={16} /> },
    ]

  return (
      <div className='h-100 w-100 d-flex flex-column'>
          <div className='page-header'>
              <h3 className='page-title'>{title}</h3>
              {
                  !hideButtons &&
                  <div className='page-toolbar'>
                      {buttonsTemplate?.map(button => {
                              const b = buttons.find(x => x.code === button.code);
                              if (b)
                                  return <Button key={b.code} variant={button.variant}
                                                 onClick={() => b.onClick()}>{button.icon}{button.text}</Button>
                              else
                                  return null;
                          }
                      )}
                  </div>
              }
          </div>
          <div className='page-card page-card--form'>
              {Component}
          </div>
      </div>
  )
}

export default EntityCardComponent
