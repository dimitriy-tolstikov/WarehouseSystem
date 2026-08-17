import {useLocation, useNavigate} from "react-router-dom";
import {
    BALANCE_PAGE_ROUTE,
    BASE_PAGE_ROUTE,
    CLIENT_PAGE_ROUTE,
    INCOME_PAGE_ROUTE,
    LOGIN_PAGE_ROUTE,
    RESOURCE_PAGE_ROUTE,
    SHIPMENT_PAGE_ROUTE,
    TOKEN_KEY,
    UNIT_PAGE_ROUTE
} from "../../utils/consts.js";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Languages,
    LayoutDashboard,
    LogOut,
    Moon,
    Package,
    Ruler,
    Scale,
    Sun,
    Users,
    type LucideIcon
} from "lucide-react";
import {useThemeMode} from "../../theme/themeMode";
import {setLocale, useTranslation, type Locale} from "../../i18n/locale";
import type {TranslationKey} from "../../i18n/translations";

const menu: Array<{label: TranslationKey, elems: Array<{name: TranslationKey, href: string, icon: LucideIcon}>}> = [
    {
        label: "menu.warehouse",
        elems: [
            {name: 'menu.dashboard', href: BASE_PAGE_ROUTE, icon: LayoutDashboard},
            {name: 'menu.balance', href: BALANCE_PAGE_ROUTE, icon: Scale},
            {name: 'menu.income', href: INCOME_PAGE_ROUTE, icon: ArrowDownToLine},
            {name: 'menu.shipment', href: SHIPMENT_PAGE_ROUTE, icon: ArrowUpFromLine},
        ]
    },
    {
        label: "menu.directories",
        elems: [
            {name: 'menu.clients', href: CLIENT_PAGE_ROUTE, icon: Users},
            {name: 'menu.units', href: UNIT_PAGE_ROUTE, icon: Ruler},
            {name: 'menu.resources', href: RESOURCE_PAGE_ROUTE, icon: Package},
        ]
    }
]

const LeftMenuComponent = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [mode, toggleTheme] = useThemeMode()
    const {t, locale} = useTranslation()

    const toggleLocale = () => {
        const next: Locale = locale === 'ru' ? 'en' : 'ru';
        setLocale(next);
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        navigate(LOGIN_PAGE_ROUTE)
    }

  return (
      <div className='LeftMenu min-vh-100'>
          <div className='LeftMenu__inner'>
              <h5 className='LeftMenu__title'>{t('app.title')}</h5>
              {
                  menu.map(e => <div key={e.label}>
                      <div className='LeftMenu__group'>{t(e.label)}</div>
                      {
                          e.elems.map(elem =>
                          <div key={elem.href}
                               className={'LeftMenu__item' + (location.pathname === elem.href ? ' LeftMenu__item--active' : '')}
                               onClick={() => navigate(elem.href)}>
                              <elem.icon size={16} />
                              {t(elem.name)}
                          </div>
                          )
                      }
                  </div>)
              }
          </div>
          <div className='LeftMenu__footer'>
              <div className='LeftMenu__theme-toggle' onClick={logout}>
                  <LogOut size={16} />
                  {t('menu.logout')}
              </div>
              <div className='LeftMenu__theme-toggle' onClick={toggleLocale}>
                  <Languages size={16} />
                  {t('menu.langSwitch')}
              </div>
              <div className='LeftMenu__theme-toggle' onClick={toggleTheme}>
                  {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {mode === 'dark' ? t('menu.themeToLight') : t('menu.themeToDark')}
              </div>
          </div>
      </div>
  )
}

export default LeftMenuComponent
