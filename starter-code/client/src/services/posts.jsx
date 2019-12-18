import axios from "axios";
import BookCarousel from "../components/Carousel";

const apiPostService = axios.create({
  baseURL: "/api/posts"
});

export const addPost = async book => {
  //console.log('I am in the add post service', book);
  const type = 'book';
  const title  = book.volumeInfo.title;
  const content = `Added ${title} to the '${type}s-to-read' wishlist.`;
  try {
    const response = await apiPostService.post(`/add-post`, {type, title, content});
    console.log('I added the post in service')
    return response.data.post;
  } catch (error) {
    console.log('I didnt add the post in service due to', error)
    throw error;
  }
};

export const addPostReading = async book => {
 // console.log('I am in the add post service', book);
  const type = 'book';
  const title  = book.title;
  let content;
  if (book.status === 'Saved') {content = `Started reading the ${type}:  ${title}.`};
  if (book.status === 'Reading') {content = `Finished reading the ${type}: ${title}.`};
  try {
    const response = await apiPostService.post(`/add-post-reading`, {type, title, content});
    //console.log('I added the post in service')
    return response.data.post;
  } catch (error) {
    console.log('I didnt add the post in service due to', error)
    throw error;
  }
};

export const addPostRemoved = async book => {
  //console.log('I am in the add post for removed books service', book);
   const type = 'book';
   const title  = book.title;
   const content = `Removed the book ${title} from bookshelf.`
   try {
     const response = await apiPostService.post(`/add-post-remove-book`, {type, title, content});
     //console.log('I added the post in service')
     return response.data.post;
   } catch (error) {
     console.log('I didnt add the post in service due to', error)
     throw error;
   }
 };

 export const getPosts = async () => {
  //console.log('I am in the get posts');
   try {
     const response = await apiPostService.post(`/get-posts`);
     //console.log('I added the post in service')
     return response.data.posts;
   } catch (error) {
     console.log('I didnt add the post in service due to', error)
     throw error;
   }
 };