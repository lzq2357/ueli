
declare module "pinyin4js" {
    export const FIRST_LETTER: string;

    export const WITHOUT_TONE: string;

    export const WITH_TONE_MARK: string;

    export const WITH_TONE_NUMBER: string;

    export function convertToPinyinString(str: string, separator: any, format: any): string;

    export function convertToSimplifiedChinese(str: any): any;

    export function convertToTraditionalChinese(str: any): any;

    export function getShortPinyin(str: any): any;
}


