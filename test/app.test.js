const express = require('express');
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const encoding = require('../node_modules/iconv-lite/encodings');
const iconvLite = require('../node_modules/iconv-lite/lib');                                                                                                                                                                             
iconvLite.getCodec('UTF-8');
const assert = require('assert');

describe("POST /api/tickets", () => {
    test('post new ticket', (done) => {
        request.post('/api/tickets')
        .send({
            "event": {
              "ticketId": 1,
              "flightDate": "2021-11-01",
              "flightNumber": "AC1",
              "seatNumber": "1A",
              "ticketCost": 100000
            }
        }).expect(200)
        .set('Content-Type', 'application/json')  
        .then((data) => {
            assert(data.status, "success");
            done();
        })
        .catch((err) => done(err));
    });
});