export class CreateOrderDto {
  title: string;
  text: string;
  competencies: Array<string>;
  price: { from: number; to: number };
  timeperiod: { from: Date; to: Date };
}