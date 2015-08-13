import axios from 'axios';

function getReposFor (username) {
  return axios.get(`https://api.github.com/users/${username}/repos`);
};

function getInfoFor (username) {
  return axios.get(`https://api.github.com/users/${username}`);
};

var helpers = {
  getGithubInfoFor (username) {
    return axios
      .all([getReposFor(username), getInfoFor(username)])
      .then((result) => {
        return {
          repos: result[0].data,
          bio: result[1].data
        }
      });
  }
};

export default helpers;
