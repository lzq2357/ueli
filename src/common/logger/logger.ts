export interface Logger {
    debug(messageOrSeparator: string, ...restOfMessage:string[]): void;
    error(messageOrSeparator: string, ...restOfMessage:string[]): void;
    openLog(): Promise<void>;
}
