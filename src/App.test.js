import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./components/Hero", () => ({
  __esModule: true,
  default: function MockHero() {
    return <div>Hero</div>;
  },
}));

test("renders marketing home", () => {
  render(<App />);
  expect(screen.getAllByRole("link", { name: "Blog" }).length).toBeGreaterThan(0);
});
