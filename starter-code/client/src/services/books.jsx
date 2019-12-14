import axios from 'axios';

const apiBookService = axios.create({
  baseURL: '/api/books'
});

export const createBook = async book => {
  console.log("I am at the post request", book, book.volumeInfo.description, book.volumeInfo.imageLinks.thumbnail)
  // const data = new FormData();
  // data.append('title', book.volumeInfo.title);
  // data.append('author', book.volumeInfo.authors[0]);
  // data.append('description', book.volumeInfo.description);
  // data.append('image', book.volumeInfo.imageLinks.thumbnail);
  // console.log("data", data)
  try {
    const response = await apiBookService.post(`/add-book`, book);
    return response.data.book;
  } catch (error) {
    throw error;
  }
};