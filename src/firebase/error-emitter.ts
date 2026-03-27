
import { FirestorePermissionError } from './errors';

type Listener = (error: FirestorePermissionError) => void;

class PermissionEventEmitter {
  private listeners: Record<string, Listener[]> = {};

  emit(event: 'permission-error', ...args: [FirestorePermissionError]): boolean {
    if (!this.listeners[event]) {
      return false;
    }
    this.listeners[event].forEach(listener => listener(...args));
    return true;
  }

  on(event: 'permission-error', listener: Listener): this {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return this;
  }

  off(event: 'permission-error', listener: Listener): this {
     if (!this.listeners[event]) {
      return this;
    }
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    return this;
  }
}

export const errorEmitter = new PermissionEventEmitter();
