const { server } = require('../index')

describe('Testing database', () => {
  it('Should connect to the database', () => {
    console.log(server)
  })
})
