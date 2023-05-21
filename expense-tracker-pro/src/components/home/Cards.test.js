import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cards from "./Cards";

describe("Testing Cards jsx", () => {
  test("Test 1", () => {
    render(<Cards />);
    const linkElement = screen.getByText("$", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 2", () => {
    render(<Cards />);
    const linkElement = screen.getByText("k", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 3", () => {
    render(<Cards />);
    const linkElement = screen.getByText("Total Spendings", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 4", () => {
    render(<Cards />);
    const linkElement = screen.getByText("total spendings", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 5", () => {
    render(<Cards />);
    const linkElement = screen.getByText("Add Expenses", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 6", () => {
    render(<Cards />);
    const linkElement = screen.getByText("add expenses", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 7", () => {
    render(<Cards />);
    const linkElement = screen.getByText("Add", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 8", () => {
    render(<Cards />);
    const linkElement = screen.getByText("New file", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 9", () => {
    render(<Cards />);
    const linkElement = screen.getByText("Download Expense", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 10", () => {
    render(<Cards />);
    const linkElement = screen.getByText("Download sheet", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 11", () => {
    render(<Cards />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const linkElement = screen.getByText("ADD EXPENSE", { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 12", () => {
    render(<Cards />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const linkElement = screen.getByText("ADD EXPENSE", { exact: true });
    expect(linkElement).not.toBeInTheDocument();
  });
  test("Test 13", () => {
    render(<Cards />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const linkElement = screen.getByText("ADD EXPENSE", { exact: false });
    expect(linkElement).toBeInTheDocument();
  });
  test("Test 14", () => {
    render(<Cards />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const linkElement = screen.getByText("ADD EXPENSE", { exact: false });
    expect(linkElement).not.toBeInTheDocument();
  });
  test("Test 15", () => {
    render(<Cards />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const linkElement = screen.getByText("ADD EXPENSE", { exact: false });
    expect(linkElement).not.toBeInTheDocument();
  });
});