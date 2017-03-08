

var request = require('request');


var github = {
  baseUrl: 'https://api.github.com',
  paths: {
    orgRepos: (orgName) => { return `/orgs/${orgName}/repos`; },
    repoLabels: (owner, repo) => { return `/repos/${owner}/${repo}/labels` }
  }
};

var ORG = 'sf-wdi-labs';
var userAgent = 'sample user agent string';

function getRepos(orgName){
  var options = {
    url: github.baseUrl + github.orgRepos(orgName),
    headers: {
      'User-Agent': userAgent
    }
  }

  request(options, (error, response, body) => {
    if (error){
      console.error(error);
    } else if (response.statusCode == 200) {
      var data = JSON.parse(body);
      var names = data.map((repo) => repo.name)
      console.log(names);
    }
  });
}


function addLabel(labelName, labelColor, repo, owner){
  var options = {
    url: github.baseUrl + github.paths.repoLabels(owner, repo),
    headers: {
      'User-Agent': userAgent
    },
    form: { name: labelName, color: labelColor }
  }
  # integration authentication, or
  request.post(options, (err, response, body) => {
    if (err){
      console.error(err);
    } else if (response.statusCode == 200){
      var data = JSON.parse(body);
      console.log(data);
    } else {
      console.log(response);
      console.log(response.statusCode);
    }
  });
}

addLabel('ES6', '#c0ffee', 'js-functions', 'SF-WDI-LABS');
