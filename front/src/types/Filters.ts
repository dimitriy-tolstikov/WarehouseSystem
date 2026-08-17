import type {FilterType} from "./Request";
import type {TranslationKey} from "../i18n/translations";

export type SelectOption = {
    value: string,
    title: string
}

interface BaseFilterOptions {
    // name — ключ перевода, в текст подставляет FilterComponent
    name: TranslationKey,
    fieldName: string,
    onChange?: (value: ReturnFilter) => void,
}

export interface SelectFilterOptions extends BaseFilterOptions{
    type: 'select',
    options?: Array<SelectOption>,
    apiPath: string,
}

export interface DateFilterOptions extends BaseFilterOptions{
    type: 'date',
    startDate?: Date,
    endDate?: Date,
    selectDate?: Date
}

export type FilterOptions = SelectFilterOptions | DateFilterOptions

export type ReturnFilter = {
    argument: string,
    fieldName: string,
    type: FilterType
}