// Минимальная клиентская валидация документов (поступление/отгрузка) перед сохранением

import {t} from "../i18n/locale";

export type DocumentItemLike = {
    resourceId?: number | null,
    unitId?: number | null,
    quantity?: number | null,
}

export type DocumentLike = {
    number?: string | null,
    date?: Date | null,
    items?: Array<DocumentItemLike> | null,
}

// Возвращает текст первой ошибки или null, если документ валиден
export const validateDocument = (doc: DocumentLike): string | null => {
    if (!doc.number || doc.number.trim() === '')
        return t('validation.numberRequired');
    if (!doc.date || isNaN(doc.date.getTime()))
        return t('validation.dateRequired');
    const items = doc.items ?? [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const n = i + 1;
        if (!item.resourceId || item.resourceId <= 0)
            return t('validation.itemResource', {n});
        if (!item.unitId || item.unitId <= 0)
            return t('validation.itemUnit', {n});
        if (!item.quantity || item.quantity <= 0)
            return t('validation.itemQuantity', {n});
    }
    return null;
}
