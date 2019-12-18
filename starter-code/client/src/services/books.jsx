import axios from "axios";

const apiBookService = axios.create({
  baseURL: "/api/books"
});

export const createBook = async book => {
  /*console.log(
    "I am at the post request",
    book,
    book.volumeInfo.description,
    book.volumeInfo.imageLinks.thumbnail
  );*/
  try {
    //console.log('in the try od adding the book to bookshelf');
    const response =  await apiBookService.post(`/add-book`, book);
    //console.log('Added the book to bookshelf');
    return response.data.book;
  } catch (error) {
    console.log('Error adding the book to bookshelf', error);
    throw error;
  }
};

export const addBookToViewerShelf = async book => {
 // console.log("I am at the post request for viewer to add a book",book,);
  try {
    const response = await apiBookService.post(`/viewer-add-book`, book);
    return response.data.book;
  } catch (error) {
    throw error;
  }
};

export const getUsersBooks = async (id) => {
  //console.log("I am at the books get request", id);
  try {
    const response = await apiBookService.post(`/get-books/${id}`);
   // console.log(response.data.user.books);
    return response.data.user.books;
  } catch (error) {
    throw error;
  }
};

export const changeBookStatus = async id => {
//  console.log("I am at the change book status request", id);
  try {
    const response = await apiBookService.patch(`/change-status/${id}`);
   // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeBook = async (id) => {
 // console.log("I am at the change book status request", id);
  try {
    const response = await apiBookService.post(`/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
