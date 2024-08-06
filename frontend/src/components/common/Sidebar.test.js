import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Sidebar from "./Sidebar";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe("Sidebar", () => {
  let providerProps;

  beforeEach(() => {
    providerProps = {
      setUser: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
    };
  });

  test("should display a sidebar", () => {
    customRender(
      <Router>
        <Sidebar />
      </Router>,
      { providerProps }
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("should navigate to different tabs when clicked", () => {
    const mockHandleTabClick = jest.fn();

    customRender(
      <Router>
        <Sidebar activeTab="home" handleTabClick={mockHandleTabClick} />
      </Router>,
      { providerProps }
    );

    const searchTab = screen.getByText("Search Books");
    const exchangeTab = screen.getByText("Exchange Requests");
    const acceptedRequestsTab = screen.getByText("Accepted Requests");

    fireEvent.click(searchTab);
    expect(mockHandleTabClick).toHaveBeenCalledWith("search");

    fireEvent.click(exchangeTab);
    expect(mockHandleTabClick).toHaveBeenCalledWith("exchange");

    fireEvent.click(acceptedRequestsTab);
    expect(mockHandleTabClick).toHaveBeenCalledWith("acceptedRequests");
  });
});
