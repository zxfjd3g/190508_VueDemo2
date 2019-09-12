const express = require('express')
const axios = require('axios')
const app = express()

app.get('/search/repositories', (req, res) => {
  console.log('------')
  const repoName = req.query.repo_name
  axios.get(`https://api.github.com/search/repositories?q=${repoName}&sort=stars`)
    .then(response => {
      res.send(response.data)
    })
})

app.get('/search/users', (req, res) => {
  const userName = req.query.user_name
  axios.get(`https://api.github.com/search/users?q=${userName}`)
    .then(response => {
      res.send(response.data)
    })
})

app.listen('4000', () => {
  console.log('服务器启动成功, 访问: http://localhost:4000')
})