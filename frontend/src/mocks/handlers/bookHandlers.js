import { rest } from "msw";

const API_BASE_URL = "http://localhost:3001/";

export const bookHandlers = [
  // Get all books
  rest.get(`${API_BASE_URL}/books`, (req, res, ctx) => {
    // Implement logic to return a list of books
    const books = [
      // Sample book data
      {
        title: "Book 1",
        author: "Author 1",
        description: "Description 1",
        bookCover: "https://picsum.photos/200/300",
        genre: "Genre 1",
        language: "Language 1",
      },
      {
        title: "Book 1",
        author: "Author 1",
        description: "Description 1",
        bookCover: "https://picsum.photos/200/300",
        genre: "Genre 1",
        language: "Language 1",
      },
    ];
    return res(ctx.status(200), ctx.json({ data: books }));
  }),

  // Create a book
  rest.post(`${API_BASE_URL}/books`, (req, res, ctx) => {
    // Implement logic to create a new book
    const newBook = {
      title: "New Book",
      author: "New Author",
      description: "New Description",
    };
    return res(ctx.status(201), ctx.json(newBook));
  }),

  // Get a book by ID
  rest.get(`${API_BASE_URL}/books/:book_id`, (req, res, ctx) => {
    // Implement logic to retrieve a book by ID
    const bookId = req.params.book_id;
    const book = {
      title: "Book",
      author: "Author",
      description: "Description",
    };
    return res(ctx.status(200), ctx.json({ data: book }));
  }),

  // Update a book by ID
  rest.put(`${API_BASE_URL}/books/:book_id`, (req, res, ctx) => {
    // Implement logic to update a book by ID
    const updatedBook = {
      title: "Updated Book",
      author: "Updated Author",
      description: "Updated Description",
    };
    return res(ctx.status(200), ctx.json(updatedBook));
  }),

  // Delete a book by ID
  rest.delete(`${API_BASE_URL}/books/:book_id`, (req, res, ctx) => {
    // Implement logic to delete a book by ID
    return res(ctx.status(204));
  }),

  // Bookmark a book
  rest.post(`${API_BASE_URL}/books/bookmark/:book_id`, (req, res, ctx) => {
    // Implement logic to bookmark a book
    return res(
      ctx.status(201),
      ctx.json({ message: "Book bookmarked successfully" })
    );
  }),

  // Remove bookmark from a book
  rest.delete(`${API_BASE_URL}/books/bookmark/:book_id`, (req, res, ctx) => {
    // Implement logic to remove bookmark from a book
    return res(
      ctx.status(200),
      ctx.json({ message: "Bookmark removed successfully" })
    );
  }),
];
