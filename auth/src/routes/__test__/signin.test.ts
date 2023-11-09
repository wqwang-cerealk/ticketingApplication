import request from 'supertest';
import { app } from '../../app';

//use an email not exit
it('fails when a email that does not exist', async() => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

//sign in with incorrect password
it('fails when an incorrect password is provided', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'notpassword'
        })
        .expect(400)
})

//successful sign in
it('set a cookie with successful signin', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
        expect(response.get('Set-Cookie')).toBeDefined();
})