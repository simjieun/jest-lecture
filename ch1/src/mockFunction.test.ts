import { obj } from "./mockFunction";
test("obj.minus 함수가 1번 호출되었다.(spy 삽입)", () => {
  const spyFn = jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
  spyFn.mockReset();
});

test.skip("obj.minus에 스파이를 심고 리턴값을 바꾸게", () => {
  const spyFn = jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(3);
  spyFn.mockReset();
});

test.todo("나중에 만들어야지~");

test("obj.minus에 스파이를 심고 리턴값이 다르게 나오게(mockReturnValue)", () => {
  jest.spyOn(obj, "minus").mockReturnValue(5);
  const result = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(5);
});
