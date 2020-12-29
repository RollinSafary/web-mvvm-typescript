export interface IModal extends JQuery<HTMLElement> {
  modal: (...args: any[]) => any;
}
export interface IInput extends JQuery<HTMLElement> {}

export enum ModalAction {
  SHOW = 'show',
  HIDE = 'hide',
}
