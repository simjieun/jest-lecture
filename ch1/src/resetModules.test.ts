beforeEach(() => {
  jest.resetModules(); // 캐시 리셋해주기
});
it("first import", async () => {
  const c = await import("./mockClass");
  (c as any).prop = "hello";
  expect(c).toBeDefined();
});

it("second import", async () => {
  //it.only도 할수있다. 오로직 한개 테스트만 돌리겠다 의미, 나머지는 다 스킵
  const c = await import("./mockClass");
  expect((c as any).prop).toBe("hello");
});
