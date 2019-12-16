import axios from "axios";

const apiBookService = axios.create({
  baseURL: "/api/books"
});

export const createBook = async book => {
  console.log(
    "I am at the post request",
    book,
    book.volumeInfo.description,
    book.volumeInfo.imageLinks.thumbnail
  );
  try {
    const response = await apiBookService.post(`/add-book`, book);
    return response.data.book;
  } catch (error) {
    throw error;
  }
};

export const getUsersBooks = async () => {
  console.log("I am at the books get request");
  try {
    const response = await apiBookService.post(`/get-books`);
    console.log(response.data.user.books);
    return response.data.user.books;
  } catch (error) {
    throw error;
  }
};

export const changeBookStatus = async id => {
  console.log("I am at the change book status request", id);
  try {
    const response = await apiBookService.patch(`/change-status/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
