import { first, second, third } from "./order";

test("first->second->third", () => {
  const spy1 = jest.fn(first);
  const spy2 = jest.fn(second);
  const spy3 = jest.fn(third);

  spy1();
  spy2();
  spy3();
  console.log(spy1.mock.invocationCallOrder[0]);
  console.log(spy2.mock.invocationCallOrder[0]);
  console.log(spy3.mock.invocationCallOrder[0]);

  //   expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
  //     spy2.mock.invocationCallOrder[0]
  //   );
  //   expect(spy3.mock.invocationCallOrder[0]).toBeGreaterThan(
  //     spy2.mock.invocationCallOrder[0]
  //   );
  expect(spy1).toHaveBeenCalledBefore(spy2);
  expect(spy3).toHaveBeenCalledAfter(spy2);
});

test("인수의 일부 테스트", () => {
  const fn = jest.fn();
  fn({
    a: {
      b: {
        c: "hello",
      },
      d: "bye",
    },
    e: ["f"],
  });

  expect(fn.mock.calls[0][0].a.b.c).toBe("hello");
});
