import { ILogger } from '@directum/sungero-remote-component-types';

// WORKAROUND-04: принудительная установка имени логгера
// ILogger не экспонирует свойство name — меняем напрямую через Object.getOwnPropertyDescriptor
// для проверки writable и каст для обхода типобезопасности.
export function setLoggerName(logger: ILogger, name: string): void {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(logger, 'name');
    if (descriptor && !descriptor.writable) {
      throw new Error('Logger name is not writable');
    }
    (logger as unknown as { name: string }).name = name;
  } catch {
    logger.info(`Failed to set logger name to "${name}"`);
  }
}
