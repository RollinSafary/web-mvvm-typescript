export function convertToCamelCase(line: string): string {
  line = line.toLowerCase();
  line = line.substr(0, 1).toUpperCase() + line.substr(1, line.length);
  for (let i: number = 0; i < line.length; i++) {
    if (line.charAt(i) === '_') {
      line =
        line.substr(0, i) +
        line.substr(i + 1, 1).toUpperCase() +
        line.substr(i + 2, line.length);
    }
  }
  line += 'Section';
  return line;
}

export function serialize(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

declare global {
  interface Array<T> {
    remove(element: T): T;
  }

  interface Window {}
}

Array.prototype.remove = function<T>(element: T) {
  this.includes(element) && this.splice(this.indexOf(element), 1);
  return element;
};

export function disableConsoleFunctions(): void {
  window.console.log = window.console.info = window.console.warn = window.console.error = () => {};
}

export function disableInspectElement(): void {
  document.onkeydown = function(e: KeyboardEvent) {
    switch (true) {
      case e.keyCode === 123:
      case e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0):
      case e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0):
      case e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0):
      case e.ctrlKey && e.keyCode == 'U'.charCodeAt(0):
        event.preventDefault();
        return false;
      default:
        break;
    }
  };
}

declare const mode: string;
export function getMode(): string {
  return mode;
}

export interface IEventRegistrationData {
  event: string;
  handler: (...args: any[]) => any;
  context: any;
}
