import { Logger } from "./logger";
import Winston from "winston";
import { dirname, basename } from "path";
import { logFormat } from "../helpers/logger-helpers";

export class ProductionLogger implements Logger {
    private readonly logger: Winston.Logger;
    private readonly filePath: string;
    private readonly fileOpener: (filePath: string) => Promise<void>;

    constructor(filePath: string, fileOpener: (filePath: string, privileged?: boolean) => Promise<void>) {
        this.filePath = filePath;
        this.fileOpener = fileOpener;

        const { combine, timestamp, errors } = Winston.format;

        this.logger = Winston.createLogger({
            defaultMeta: { service: "user-service" },
            format: combine(errors({stack: true}), timestamp(), logFormat),
            level: "debug",
            transports: [
                new Winston.transports.File({
                    dirname: dirname(filePath),
                    filename: basename(filePath),
                    level: "debug",
                    maxFiles: 1,
                    maxsize: 1000000,
                }),
                new Winston.transports.Console({
                    level: "debug",
                }),
            ],
        });
    }

    public debug(message: string, ...restOfMessage:string[]): void {
        if(restOfMessage == null || restOfMessage.length === 0){
            this.logger.debug(message);
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        this.logger.debug(tmpMessage);
    }

    public error(message: string, ...restOfMessage:string[]): void {
        if(restOfMessage == null || restOfMessage.length === 0){
            this.logger.debug(message);
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        this.logger.error(tmpMessage);
    }

    public openLog(): Promise<void> {
        return this.fileOpener(this.filePath);
    }
}
