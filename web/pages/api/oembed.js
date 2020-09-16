// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { extract } = require('oembed-parser')

export default (req, res) => {
  const { url } = JSON.parse(req.body)
  extract(url)
    .then(data => {
      res.statusCode = 200
      res.json({
        statusCode: 200,
        result: data,
        status: 'success'
      })
    })
    .catch(err => {
      res.statusCode = 500
      res.json({
        statusCode: 500,
        error: err,
        status: 'error'
      })
    })
}
