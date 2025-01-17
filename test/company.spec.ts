import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../bin/www';
import * as service from '../database/company-service';

chai.use(chaiHttp);

describe('company test', () => {
  it('login db test', async () => {
    const result = await service.getCompanyByEmail('abcd');
    expect(result.status).to.equal('success');
  });

  it('login api test', async () => {
    const res = await chai.request(server).post('/company/login').send({ email: 'abcd', password: 'abcd' });
    expect(res.status).to.equal(202);

    const res2 = await chai.request(server).post('/company/login').send({ email: 'abcd@acd.com', password: 'abcdadf' });
    expect(res2.status).to.equal(202);
  });

  it('get product db test', async () => {
    const result = await service.getProducts(0);
    expect(result.status).to.equal('success');
  });

  it('get product api test', async () => {
    const res = await chai.request(server).get('/company/products').send();
    expect(res.status).to.equal(403);
  });

  it('get sale db test', async () => {
    const result = await service.getSale(0);
    expect(result.status).to.equal('success');
  });

  it('get sale api test', async () => {
    const res = await chai.request(server).get('/company/sale').send();
    expect(res.status).to.equal(403);
  });

  it('business api test', async () => {
    const res = await chai.request(server).post('/company/info/business').send();
    expect(res.status).to.equal(403);
  });

  it('refund db test', async () => {
    const result = await service.refund(1, {});
    expect(result.status).to.equal('success');
  });

  it('refund api test', async () => {
    const res = await chai.request(server).get('/company/refund/1').send();
    expect(res.status).to.equal(403);
  });
});

describe('company products test', () => {
  it('delete product detail test', async () => {
    const delDetailResult = await service.deleteProduct(100);
    expect(delDetailResult.status).to.equal('success');
  });
  it('delete product image test', async () => {
    const delImResult = await service.deleteProductImage(100);
    expect(delImResult.status).to.equal('success');
  });

  it('get company by product db test', async () => {
    const result = await service.getCompanyByProduct(0);
    expect(result.status).to.equal('success');
  });
});

describe('company signup test', () => {
  it('company signup ducplicate', async () => {
    const info = {
      email: 'naver@gmail.com',
      name: 'test company',
      password: 'test',
      phone_number: '12312341234',
      business_number: '1256415',
      account_number: '8654565564',
      account_holder: '김회사',
      account_bank: '국민은행',
    };
    const res = await chai.request(server).post('/company/signup').send(info);
    expect(res.status).to.equal(404);
  });
});

describe('company info test', () => {
  it('get company information test', async () => {
    const result = await service.getInfo(1);
    expect(result.status).to.equal('success');
  });

  it('find company id test', async () => {
    const result = await service.getIdByNameAndPhone('a', 'a');
    expect(result.status).to.equal('success');
  });

  it('find company by name, email, phone', async () => {
    const result = await service.getUserByEmailNamePhone('a', 'a', 'a');
    expect(result.status).to.equal('success');
  });
});

describe('company order test', () => {
  it('get company order test', async () => {
    const result = await service.getOrder(3);
    expect(result.status).to.equal('success');
  });

  it('put delivery number test', async () => {
    const result = await service.addDeliveryNumber(1, 1, '1111');
    expect(result.status).to.equal('success');
  });
});

describe('product board test', () => {
  it('get product board', async () => {
    const result = await service.getBoard(1);
    expect(result.status).to.equal('success');
  });
  it('post product board', async () => {
    const result = await service.postBoard(1, 'test');
    expect(result.status).to.equal('success');
  });
});
