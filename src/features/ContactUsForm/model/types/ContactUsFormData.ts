export class ContactUsFormData {
  user_name: string = '';
  email: string = '';
  content: string = '';

  constructor(initData?: Partial<ContactUsFormData>) {
    if (initData) {
      Object.assign(this, initData);
    }
  }
}
