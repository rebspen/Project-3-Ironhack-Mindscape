

export const roundPicture = (imageURL)  => {
  let firstPart = imageURL.substring(0, imageURL.indexOf('upload/') + 7);
  //7 is the number of characters in upload/, so it will include it
  let middle = 'w_100,h_100,c_thumb,g_face,r_max/';
  let lastPart = imageURL.split('upload').pop();
  return firstPart + middle + lastPart;
};