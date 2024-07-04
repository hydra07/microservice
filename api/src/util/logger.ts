
export class Logger {
    static info(message: string, ...optionalParams: any[]) {
      console.info(message, ...optionalParams);
    }
  
    static warn(message: string, ...optionalParams: any[]) {
      console.warn(message, ...optionalParams);
    }
  
    static error(message: string, ...optionalParams: any[]) {
      console.error(message, ...optionalParams);
    }
  }
  