const { join, logout } = require("./auth");
const { User, describe } = require("../models/user");
const passport = require("passport");

describe("join", () => {
  it("이메일이 없으면 프론트로 no_email 에러를 쿼리스트링으로 보낸다", async () => {
    const req = {
      body: {
        email: "",
        password: "password0!",
        nick: "조이",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {}; // 여기까지 모킹하는 코드

    await join(req, res, next); // 실제로 실행하는 코드
    expect(res.redirect).toHaveBeenCalledWith("/join?error=no_email"); // 기대와 부응하는지 확인 코드
  });
  it("이미 가입한 이메일이면 에러를 띄운다", async () => {
    const req = {
      body: {
        email: "joy@gmail.com",
        password: "password0!",
        nick: "조이",
      },
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = () => {}; // 여기까지 모킹하는 코드
    jest.spyOn(User, "findOne").mockResolvedValue({ id: 1 });
    jest.spyOn(User, "creat").mockImplementation();

    await join(req, res, next); // 실제로 실행하는 코드
    expect(res.redirect).toHaveBeenCalledWith("/join?error=exist"); // 기대와 부응하는지 확인 코드
    expect(User.create).not.toHaveBeenCalled();
  });
});

describe("join", () => {
  it("로컬 로그인 시 에러가 있으면 에러처리함수로 에러를 넘긴다.", () => {
    const authError = new Error();
    jest
      .spyOn(passport, "authenticate")
      .mockImplementation((name, cb) => (req, res, next) => {
        cb(authError, null, null);
      });

    const req = {};
    const res = {};
    const next = jest.fn();
    login(req, res, next);
    expect(next).toHaveBeenCalledWith(authError);
  });
  it("로컬 로그인 시 에러가 없지만 유저도 없으면 프론트 쿼리스트링으로 에러를 보낸다", () => {
    const req = {};
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    loginCallback(req, res, next)(null, null, {
      message: "유저 없음",
    });
    expect(res.redirect).toHaveBeenCalledWith("/?error=유저 없음");
  });
  it("로컬 로그인은 성공했는데 req.login에서 에러가 있으면 에러처리함수로 에러를 보낸다", () => {
    const error = new Error();

    const req = {
      login: jest.fn((user, cb) => {
        cb(error);
      }),
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    loginCallback(req, res, next)(null, {}, null);
    expect(res.login).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("로컬 로그인은 성공했고 req.login에도 에러가 없으면 프론트 /로 돌려보낸다", () => {
    const error = new Error();

    const req = {
      login: jest.fn((user, cb) => {
        cb();
      }),
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    loginCallback(req, res, next)(null, {}, null);
    expect(req.login).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith("/");
    expect(next).not.toHaveBeenCalled();
  });
});

describe("logout", () => {
  it("로그아웃후 홈으로 이동한다", () => {
    const req = {
      logout: jest.fn((cb) => {
        cb();
      }),
    };
    const res = {
      redirect: jest.fn(),
    };
    logout(req, res);
    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
