import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('deve retornar um account se tudo der certo', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Jorge',
        email: 'JorgeAmaro@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
