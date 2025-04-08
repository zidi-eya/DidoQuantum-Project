export class Observable {
  name: string;
  observers: Observer[];

  constructor(name: string, observers: Observer[] = []) {
    this.name = name;
    this.observers = observers;
  }

  addObserver(ob: Observer) {
    this.observers.push(ob);
  }

  removeObserver(ob: Observer) {
    const index = this.observers.indexOf(ob);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObserver(name: string) {
    for (const observer of this.observers) {
      if (observer.name == name) {
        observer.update();
      }
    }
  }
}

export class Observer {
  name: string;
  private onUpdate: () => void;

  constructor(name: string, onUpdate: () => void) {
    this.name = name;
    this.onUpdate = onUpdate;
  }

  update() {
    this.onUpdate();
  }
}

const eventsObservable = new Observable('events');

export { eventsObservable };
