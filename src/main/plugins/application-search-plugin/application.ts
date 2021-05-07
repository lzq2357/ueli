import { Icon } from "../../../common/icon/icon";

export interface Application {
    name: string;
    extension: string[];
    filePath: string;
    icon: Icon;
}
