var userController = require('../../controllers/userController.js'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    request = require('supertest'),
    app = require('../../server.js').app;

describe('user controller', function () {
    describe('adding a new user', function () {
        it('should save a new user', function (done) {
            request(app)
                .get('/users')
                .expect(200, done);
        })
    })
})