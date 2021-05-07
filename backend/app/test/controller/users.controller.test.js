const Users = require('../users.json')

const MockResponse = jest.fn()

describe('Testing Functions Users', () => {
  test('should fetch all users ', async () => {
    const users = [{ name: 'Bob' }];
    await MockResponse.mockReturnValueOnce(Users)
    expect(MockResponse()).toBeTruthy()
    expect(MockResponse()).not.toEqual(users)
    expect(MockResponse.mock.results[0].value).toHaveLength(2)
  });
  test('should search for the user with the informed email', async () => {
    const users = {
      "id": 2,
      "username": "luis.flores",
      "email": "luis.flores@mail.com",
      "password": "f8199a7d-7d60-5100-b052-90a6e133ce77",
      "createdAt": "2021-05-04T18:39:01.222Z",
      "updatedAt": "2021-05-04T18:39:01.222Z"
    };
    await MockResponse.mockReturnValueOnce(Users[0]).mockReturnValueOnce(Users[1])
    expect(MockResponse()).not.toMatchObject(users)
    expect(MockResponse()).toMatchObject(users)
  });
});
