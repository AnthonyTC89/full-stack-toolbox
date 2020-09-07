const express = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);
const url = 'http://localhost:3001';

describe('GET data ', () => {
  it('request should be a success array', (done) => {
    chai.request(url)
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
    chai.request(url)
      .post('/api/data')
      .send({ text: 'test' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('request should be error without text in body', (done) => {
    chai.request(url)
      .post('/api/data')
      .send({ })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
