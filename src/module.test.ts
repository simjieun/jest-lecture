jest.mock("./module");
import { obj } from "./module";

// jest.mock("./module", () => {
//   return {
//     ...jest.requireActual("./module"),
//     obj: {
//       ...jest.requireActual("./module").obj,
//       method3() {
//         return "method3";
//       },
//     },
//   };
// });
test("모듈을 전부 모킹", () => {
  jest.replaceProperty(obj, "prop", "replaced");
  console.log(obj);
});
