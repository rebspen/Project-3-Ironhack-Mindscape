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