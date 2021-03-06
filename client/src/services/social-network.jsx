import axios from 'axios';

const apiAuthenticationService = axios.create({
  baseURL: '/api/social'
});

export const FollowUser = async data => {
  try {
  const response = await apiAuthenticationService.patch(`/add-follower`, data);
  return response.data.user;
} catch (error) {
  throw error;
}
};

export const UnfollowUser = async data => {
  try {
  const response = await apiAuthenticationService.patch(`/remove-follower`, data);
  return response.data.user;
} catch (error) {
  throw error;
}
};

export const UserList = async () => {
 // console.log('in front end users list service');
  try {
  const response = await apiAuthenticationService.get(`/user-list`);
  return response.data.users;
} catch (error) {
  throw error;
}
};