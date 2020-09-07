const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');

const app = require('../src/server');

const { expect } = chai;
chai.use(chaiHttp);

describe('GET data ', () => {
  it('request should be a success array', (done) => {
    request(app)
      .get('/api/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('POST data ', () => {
  it('request should be success created', (done) => {
    request(app)
      .post('/api/data')
      .send({ text: 'test' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('request should be error without text in body', (done) => {
    request(app)
      .post('/api/data')
      .send({ })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
