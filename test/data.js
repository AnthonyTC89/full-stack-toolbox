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

describe('DELETE data ', () => {
  it('request should be a success (200)', (done) => {
    request(app)
      .delete('/api/data/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('request should be an error not found (404) with invalid id(index)', (done) => {
    request(app)
      .delete('/api/data/4')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
