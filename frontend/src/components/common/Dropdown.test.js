import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Dropdown from "./Dropdown";

describe("Dropdown Test", () => {
  test("Should Display Dropdown Options and Handle Selection", () => {
    const userBooks = [
      { title: "Book 1", bookObject: { id: 1 } },
      { title: "Book 2", bookObject: { id: 2 } },
    ];

    render(
      <Dropdown
        dropdownList={userBooks.map((userBook) => ({
          title: userBook.title,
          bookObject: userBook,
        }))}
        dropdownLabel="Select book for exchange"
        dropdownPlaceholder="Select a book"
        selectedValue="Book 1" // Set the selected value
        onDropdownChange={() => {}}
      />
    );

    expect(screen.getByText("Select book for exchange")).toBeInTheDocument();

    const dropdown = screen.getByTestId("options-menu");

    expect(dropdown).toBeInTheDocument();

    fireEvent.change(dropdown, { target: { value: "Book 2" } });

    expect(dropdown.value).toBe("Book 2");
  });
});
