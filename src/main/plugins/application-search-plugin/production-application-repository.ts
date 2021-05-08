import { ApplicationRepository } from "./application-repository";
import { Application } from "./application";
import { ApplicationSearchOptions } from "../../../common/config/application-search-options";
import { basename, extname } from "path";
import { Icon } from "../../../common/icon/icon";
import { ApplicationIconService } from "./application-icon-service";
import { getApplicationIconFilePath } from "./application-icon-helpers";
import { IconType } from "../../../common/icon/icon-type";
import { Logger } from "../../../common/logger/logger";
import { OperatingSystemVersion } from "../../../common/operating-system";
import {convertToPinyinString, getShortPinyin, WITHOUT_TONE} from "pinyin4js";
import {readdirSync, readFileSync, existsSync} from "fs";
import {detect} from "jschardet";

export class ProductionApplicationRepository implements ApplicationRepository {
    private applications: Application[];
    private readonly defaultAppIcon: Icon;
    private readonly appIconService: ApplicationIconService;
    private readonly searchApplications: (
        options: ApplicationSearchOptions,
        logger: Logger,
        operatingSystemVersion: OperatingSystemVersion,
    ) => Promise<string[]>;
    private config: ApplicationSearchOptions;
    private readonly logger: Logger;
    private readonly operatingSystemVersion: OperatingSystemVersion;

    constructor(
        config: ApplicationSearchOptions,
        defaultAppIcon: Icon,
        appIconService: ApplicationIconService,
        searchApplications: (
            options: ApplicationSearchOptions,
            logger: Logger,
            operatingSystemVersion: OperatingSystemVersion
        ) => Promise<string[]>,
        logger: Logger,
        operatingSystemVersion: OperatingSystemVersion,
    ) {
        this.config = config;
        this.defaultAppIcon = defaultAppIcon;
        this.appIconService = appIconService,
        this.searchApplications = searchApplications;
        this.logger = logger;
        this.operatingSystemVersion = operatingSystemVersion;
        this.applications = [];
    }

    public getAll(): Promise<Application[]> {
        return Promise.resolve(this.applications);
    }

    public refreshIndex(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.searchApplications(this.config, this.logger, this.operatingSystemVersion)
                .then((filePaths) => {
                    const applications = filePaths.map((filePath) => this.createApplicationFromFilePath(filePath));

                    if (this.config.useNativeIcons) {
                        this.appIconService.generateAppIcons(applications)
                            .then(() => {
                                this.onSuccessfullyGeneratedAppIcons(applications);
                                this.applications = applications;
                                resolve();
                            })
                            .catch((err) => reject(err));
                    } else {
                        this.applications = applications;
                        resolve();
                    }
                })
                .catch((err) => reject(err));
        });
    }

    public clearCache(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.appIconService.clearCache()
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    public updateConfig(updatedConfig: ApplicationSearchOptions): Promise<void> {
        return new Promise((resolve) => {
            this.config = updatedConfig;
            resolve();
        });
    }

    private createApplicationFromFilePath(filePath: string): Application {
        const appName:string = basename(filePath).replace(extname(filePath), "");
        const namePinyin:string = convertToPinyinString(appName, "", WITHOUT_TONE);
        const namePinyinFirstLetter:string = getShortPinyin(appName);
        const appLocalName:string = this.parseAppLocalName(filePath, appName);
        const appLocalNamePinyin:string = convertToPinyinString(appLocalName, "", WITHOUT_TONE);
        const appLocalNamePinyinFistLetter:string = getShortPinyin(appLocalName);

        return {
            filePath,
            icon: this.defaultAppIcon,
            name: appLocalName,
            searchable:[appName, namePinyin, namePinyinFirstLetter, appLocalName, appLocalNamePinyin, appLocalNamePinyinFistLetter]
        };
    }

    private parseAppLocalName(filepath: string, defaultName: string): string {
        //系统app 不处理， /System/Applications/xxx
        if(!filepath.startsWith("/Applications")){
            return defaultName;
        }
        const resourcePath:string = filepath + "/Contents/Resources/";
        if(!existsSync(resourcePath)){
            return defaultName;
        }
        const allFileNames: string[] = readdirSync(resourcePath);
        console.log(resourcePath + allFileNames);
        for(const fileName of allFileNames){
            // zh-Hans.lproj, zh_CN.lproj
            if(fileName !== "zh-Hans.lproj" && fileName !== "zh_CN.lproj"){
                continue;
            }
            // InfoPlist.strings
            const filePathFinal:string = resourcePath + fileName + "/InfoPlist.strings";
            if(!existsSync(filePathFinal)){
                return defaultName;
            }
            const fileDataBin = readFileSync(filePathFinal);
            const detectedMap = detect(fileDataBin);
            const encodingString:string = detectedMap.encoding;
            let fileData = "";

            // "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex"
            if(encodingString === "UTF-16LE"){
                fileData = fileDataBin.toString("utf16le");
            }
            else{
                fileData = fileDataBin.toString("utf-8");
            }
            // CFBundleDisplayName、 CFBundleName
            const fileDataLines = fileData.split("\n");
            let bundName:string = "";
            for(const line of fileDataLines){
                if(line.indexOf("CFBundleDisplayName") !== -1){
                    const bundleNames = line.split("=");
                    bundName = bundleNames[1];
                    break;
                }
                if(line.indexOf("CFBundleName") !== -1){
                    const bundleNames = line.split("=");
                    bundName = bundleNames[1];
                    break;
                }
            }
            if(bundName !=null && bundName !== ""){
                return bundName.replaceAll("\"", "").replace(";", "");
            }
        }
        return defaultName;
    }


    private onSuccessfullyGeneratedAppIcons(applications: Application[]) {
        applications.forEach((application) => application.icon = {
            parameter: getApplicationIconFilePath(application.filePath),
            type: IconType.URL,
        });
    }
}
