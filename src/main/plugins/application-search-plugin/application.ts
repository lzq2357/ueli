import { Icon } from "../../../common/icon/icon";

export interface Application {
    name: string;
    searchable: string[];
    filePath: string;
    icon: Icon;
}
