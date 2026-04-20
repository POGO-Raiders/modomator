import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders heading and Heatran image", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { name: /404.*page not found/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /heatran/i })).toBeInTheDocument();
  });
});
