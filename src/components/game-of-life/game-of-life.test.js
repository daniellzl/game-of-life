import { shallow } from "enzyme";
import GameOfLife from "./game-of-life.component";

const BOARD = [
  [1, 1, 0, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1],
  [0, 0, 0, 0, 1],
];

it("doesn't explode", () => {
  expect(shallow(<GameOfLife initialBoard={BOARD} />)).toMatchSnapshot();
});

// it("can start a game", () => {
//   const wrapper = shallow(<GameOfLife />);
//   wrapper.find('[id="start-game"]').simulate("click");
//   // expect(wrapper.state()).toEqual({ count: 2 });
//   console.log(wrapper.state());
// });
