const { renderProfile, renderJoin, renderMain } = require("./page");
jest.mock("../models");

it("renderProfile은 res.render profile을 호출해야 함", () => {
  const res = {
    render: jest.fn(),
  };

  renderProfile({}, res);

  expect(res.render).toHaveBeenCalledWith("profile", {
    title: "내 정보 - NodeBird",
  });
});

describe("renderMain", () => {
  it("게시글 조회 시 에러가 발생한다면 에러처리함수로 에러를 넘김", async () => {
    const error = new Error();
    jest.spyOn(Post, "findAll").mockRejectedValue(error);

    const res = {
      render: jest.fn(),
    };

    const next = jest.fn();
    await renderMain({}, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
  it("게시글 조회한 것을 res.render로 화면에 렌더링", async () => {
    const error = new Error();
    jest.spyOn(Post, "findAll").mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const res = {
      render: jest.fn(),
    };

    const next = jest.fn();
    await renderMain({}, res, next);
    expect(res.render).toHaveBeenCalledWith("main", {
      title: "NodeBird",
      twits: [{ id: 1 }, { id: 2 }],
    });
    expect(next).not.toHaveBeenCalled();
  });
});
