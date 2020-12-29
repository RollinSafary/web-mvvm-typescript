import { Facade } from '@rollinsafary/mvvm';
import IModel from '@rollinsafary/mvvm/lib/com/rollinsafary/mvvm/patterns/model/IModel';

export default abstract class BaseModel<M> implements IModel<M> {
  public facade: Facade;
  public proxyName: string;
  public vo: M;
  constructor(vo?: M) {
    if (vo) {
      this.vo = vo;
    }
  }

  public initializeNotifier(): void {
    this.facade = Facade.getInstance();
    this.proxyName = this.constructor.name;
  }

  public sendNotification(notificationName: string, ...args: any[]): void {
    this.facade.sendNotification(notificationName, ...args);
  }
  public onRegister(): void {}

  public onRemove(): void {}
}
