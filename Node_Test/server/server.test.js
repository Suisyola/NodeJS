const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

it('should return hello world response', (done) => {
    request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
            expect(res.body).toInclude({
                error: 'Page not found'
            })
        })
        .end(done);
});

it('should return a user', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
            expect(res.body).toInclude({
                name: 'User 1',
                age: 30
            })
        })
        .end(done);
});