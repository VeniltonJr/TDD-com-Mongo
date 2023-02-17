import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('deve retornar content type como json', async () => {
    app.post('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })

  test('deve retornar xml quando forcar o content type', async () => {
    app.post('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
