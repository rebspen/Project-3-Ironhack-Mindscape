

export const roundPicture = (imageURL)  => {
  let firstPart = imageURL.substring(0, imageURL.indexOf('upload/') + 7);
  //7 is the number of characters in upload/, so it will include it
  let middle = 'w_400,h_400,c_crop,g_face,r_max';
  let lastPart = imageURL.split('upload').pop();
  console.log('picture url', firstPart + middle + lastPart);
  return firstPart + middle + lastPart;
};