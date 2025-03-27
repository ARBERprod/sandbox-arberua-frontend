export class FormField<Value = any> {
  _field: true = true;
  value: Value;
  path: string;

  constructor(initValue: Value, path: string) {
    this.value = initValue;
    this.path = path;
  }
}
