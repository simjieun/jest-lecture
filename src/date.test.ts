import { after3days } from "./date";

test("3일 후를 리턴한다", () => {
  //   const date = new Date();
  //   date.setDate(date.getDate() + 3);
  jest.useFakeTimers().setSystemTime(new Date(2024, 12, 3));
  console.log(new Date());
  expect(after3days()).toStrictEqual(new Date(2024, 12, 6));
});

test("0.1+0.2는 0.3", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});

afterEach(() => {
  jest.useRealTimers(); // 가짜 시간 쓰고 다시 돌려놔야한다.
});
