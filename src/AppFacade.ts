import { Facade } from '@rollinsafary/mvvm';
import App from './App';
import { consoleArgs } from './constants/Constants';

export default class AppFacade extends Facade {
  public static NAME: string = 'AppFacade';
  public static STARTUP: string = `${AppFacade.NAME}StartUp`;

  public static app: App;

  public static getInstance(): AppFacade {
    if (!Facade.instance) {
      Facade.instance = new AppFacade();
    }
    return Facade.instance as AppFacade;
  }

  public initializeFacade(): void {
    super.initializeFacade();
    this.startup();
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    consoleArgs[0] = `%c %c %c ${notificationName}${
      args.length > 0 ? ' | ' + args : ''
    } %c %c `;
    console.log.apply(console, consoleArgs);
    super.sendNotification(notificationName, ...args);
  }

  protected initializeModel(): void {
    super.initializeModel();
  }

  protected initializeView(): void {
    super.initializeView();
  }

  private startup(): void {
    this.sendNotification(AppFacade.STARTUP);
  }
}
