import { expect } from "vitest";
import ProjectHeader from "../../../src/components/ProjectManagement/ProjectHeader";
import { screen, render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe("Project Header", () => {
  it("populates project's title and generates the correct number of links", () => {
    const title = "Test Title";
    const links = [
      { href: "/link1", text: "Link 1" },
      { href: "/link2", text: "Link 2" },
    ];

    render(
      <MemoryRouter initialEntries={["/projects/"]}>
        <ProjectHeader title={title} links={links} />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading"); // Use getByRole - no await needed
    expect(heading).toHaveTextContent(title);

    const allLinks = screen.getAllByRole("link"); // Use getAllByRole - no await needed
    expect(allLinks.length).toBe(links.length);

    links.forEach((expectedLink, index) => {
      const actualLink = allLinks[index];
      expect(actualLink).toHaveAttribute("href", expectedLink.href);
      expect(actualLink).toHaveTextContent(expectedLink.text);
    });
  });
});