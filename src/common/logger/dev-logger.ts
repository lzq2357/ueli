import { Logger } from "./logger";
import Winston from "winston";
import { logFormat } from "../helpers/logger-helpers";

export class DevLogger implements Logger {
    private readonly logger: Winston.Logger;

    constructor() {
        const { combine, timestamp, errors } = Winston.format;

        this.logger = Winston.createLogger({
            defaultMeta: { service: "user-service" },
            format: combine(errors({stack: true}), timestamp(), logFormat),
            level: "debug",
            transports: [
                new Winston.transports.Console({ level: "debug" }),
            ],
        });
    }

    public debug(message: string, ...restOfMessage:string[]): void {
        if(restOfMessage == null){
            this.logger.debug(message);
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        this.logger.debug(tmpMessage);
    }

    public error(message: string, ...restOfMessage:string[]): void {
        if(restOfMessage == null){
            this.logger.debug(message);
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        this.logger.error(tmpMessage);
    }

    public openLog(): Promise<void> {
        return Promise.reject("Dev logger does not have a log file");
    }
}
