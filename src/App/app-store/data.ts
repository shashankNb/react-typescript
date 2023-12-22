
export class APIData<T> {
    constructor(public data: T, public meta?: any, public error?: any[]) {
    }
  }