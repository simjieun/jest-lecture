import { obj } from "./toStrictEqual";

test("객체는 toStrictEqual로 비교한다", () => {
  expect(obj()).toStrictEqual({ a: "hello" });
});
