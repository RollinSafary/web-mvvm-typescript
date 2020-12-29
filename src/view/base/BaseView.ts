import { Facade, IView } from '@rollinsafary/mvvm';
import { IEventRegistrationData } from '../../utils/Utils';

export default abstract class BaseView implements IView {
  public facade: Facade;
  public viewId: number;
  public viewName: string;
  public notificationInterests: string[] = [];
  public isAwake: boolean = true;
  public viewComponentEvents: IEventRegistrationData[] = [];

  constructor() {
    this.initializeNotifier();
  }

  public sleep(): void {
    this.isAwake = false;
  }

  public wake(): void {
    this.isAwake = true;
  }

  public getViewName(): string {
    return this.viewName;
  }
  public getViewId(): number {
    return this.viewId;
  }

  public subscribeToNotifications(...notificationNames: string[]): void {
    for (const notificationName of notificationNames) {
      this.subscribeToNotification(notificationName);
    }
  }

  public subscribeToNotification(notificationName: string): void {
    !this.notificationInterests.includes(notificationName) &&
      this.notificationInterests.push(notificationName);
  }

  public unSubscribeFromNotifications(...notificationNames: string[]): void {
    for (const notificationName of notificationNames) {
      this.unSubscribeFromNotification(notificationName);
    }
  }

  public unSubscribeFromNotification(notificationName: string): void {
    this.notificationInterests.includes(notificationName) &&
      this.notificationInterests.remove(notificationName);
  }

  public handleSubscribedNotification(
    notificationName: string,
    ...args: any[]
  ): void {
    this.isAwake && this.handleNotification(notificationName, ...args);
  }
  public abstract registerNotificationInterests(): void;
  public abstract handleNotification(
    notificationName: string,
    ...args: any[]
  ): void;

  public onRegister(): void {}

  public onRemove(): void {}

  public initializeNotifier(): void {
    this.facade = Facade.getInstance();
    this.viewName = this.constructor.name;
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    this.facade.sendNotification(notificationName, ...args);
  }
}
