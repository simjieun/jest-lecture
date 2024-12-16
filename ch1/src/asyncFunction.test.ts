import { okPromise, noPromise, okAsync, noAsync } from "./asyncFunction";
test("okPromise 테스트", () => {
  const okSpy = jest.fn(okPromise);
  return expect(okSpy()).resolves.toBe("ok");
});

test("okPromise 테스트2", () => {
  const okSpy = jest.fn(okPromise);
  return okSpy().then((result) => {
    expect(result).toBe("ok");
  });
});

test("okPromise 테스트3", async () => {
  const okSpy = jest.fn(okPromise);
  const result = await okSpy();

  return expect(result).toBe("ok");
});

test("noPromise 테스트", () => {
  const noSpy = jest.fn(noPromise);
  return expect(noSpy()).rejects.toBe("no");
});

test("noPromise 테스트2", () => {
  const noSpy = jest.fn(noPromise);
  return noSpy().catch((result) => {
    expect(result).toBe("no");
  });
});

test("noPromise 테스트3", async () => {
  const noSpy = jest.fn(noPromise);
  try {
    const result = await noSpy();
  } catch (err) {
    expect(err).toBe("no");
  }
});
