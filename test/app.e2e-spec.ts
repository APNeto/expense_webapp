import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { data, ReportType } from './../src/data';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/report/income (GET)', () => {
    return request(app.getHttpServer())
      .get('/report/income')
      .expect(200)
      .expect(JSON.stringify([
        data.report[0],
        data.report[1]
      ]));
  });

  it('/report/income/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/report/income/uuid1')
      .expect(200)
      .expect(JSON.stringify(data.report[0]));
  });

  it('/report/income (POST)', () => {
    return request(app.getHttpServer())
      .post('/report/income')
      .send({ amount: 3000, source: "Dividends" })
      .expect(201)
  });

  it('/report/income:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/report/income/uuid3')
      .send({ amount: 1000, source: "Bets" })
      .expect(200)
      .expect(JSON.stringify(
        {
          ...data.report[2],
          source: "Bets",
          amount: 1000,
        }
      ));
  });

  it('/report/income:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/report/income/uuid3')
      .expect(200)
      .expect(JSON.stringify(
        { "success": true }
      ));
  });
});
