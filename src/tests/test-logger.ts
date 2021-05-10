import { Logger } from "../common/logger/logger";
import { LogMessage } from "../common/logger/log-message";
import { LogMessageType } from "../common/logger/log-message-type";

export class TestLogger implements Logger {
    private readonly messages: LogMessage[];

    constructor() {
        this.messages = [];
    }

    public debug(message: string, ...restOfMessage:string[]) {
        if(restOfMessage == null){
            this.messages.push({
                message,
                type: LogMessageType.Error,
            });
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        message = tmpMessage;
        this.messages.push({
            message,
            type: LogMessageType.Error,
        });
    }

    public error(message: string, ...restOfMessage:string[]) {
        if(restOfMessage == null){
            this.messages.push({
                message,
                type: LogMessageType.Debug,
            });
            return;
        }
        let tmpMessage = restOfMessage.join(message);
        message = tmpMessage;
        this.messages.push({
            message,
            type: LogMessageType.Debug,
        });
    }

    public openLog(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    public getAllMessages(): LogMessage[] {
        return this.messages;
    }
}
