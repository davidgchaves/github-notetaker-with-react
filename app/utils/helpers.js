var axios = require('axios');

function getReposFor (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
};

function getInfoFor (username) {
  return axios.get('https://api.github.com/users/' + username);
};

var helpers = {
  getGithubInfoFor: function (username) {
    return axios
      .all([getReposFor(username), getInfoFor(username)])
      .then(function (result) {
        return {
          repos: result[0].data,
          bio: result[1].data
        }
      });
  }
};

module.exports = helpers;
