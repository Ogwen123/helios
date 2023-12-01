export class Logger {
    public prefix = ""

    public constructor(prefix: string) {
        this.prefix = prefix
    }

    static BLACK = "\u001b[30m"
    static RED = "\u001b[31m"
    static GREEN = "\u001b[32m"
    static YELLOW = "\u001b[33m"
    static BLUE = "\u001b[34m"
    static MAGENTA = "\u001b[35m"
    static CYAN = "\u001b[36m"
    static WHITE = "\u001b[37m"
    static RED_BG = "\u001b[37;41m"

    public log = (message: string, color: String) => {
        console.log(color + "[" + this.prefix + "]" + "\u001b[0m " + message)
    }

    public info = (message: string) => this.log(message, Logger.BLUE)
    public warn = (message: string) => this.log(message, Logger.YELLOW)
    public error = (message: string) => this.log(message, Logger.RED)
    public fatal = (message: string) => this.log(message, Logger.RED_BG)
}