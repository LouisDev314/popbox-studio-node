export default class Exception {
  msg: string;
  code: number;
  data: Record<string, unknown> | unknown | null;

  constructor(code: number, msg?: string, data?: Record<string, unknown> | unknown) {
    this.msg = msg ?? '';
    this.code = code;
    this.data = data ?? null;
  }
}
