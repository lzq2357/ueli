import { Icon } from "../../../common/icon/icon";

export interface Application {
    name: string;
    name_pinyin:string;
    name_pinyin_first_letter:string;
    filePath: string;
    icon: Icon;
}
