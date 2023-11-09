import request from 'supertest';
import { app } from '../../app';

it('response with details about the current user', async() => {
    const cookie = await global.signin();
    
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    
    expect(response.body.currentUser.email).toEqual('test@test.com')
})

//not authorized
it('response with null if no current user is sign in',async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
    
    expect(response.body.currentUser).toEqual(null);
})