import request from 'request';

describe('Reading News', () => {

  it('default query', (done) => {
    request.get('http://localhost:8080/api/news' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(20);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('with page', (done) => {
    request.get('http://localhost:8080/api/news?page=1' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(20);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('with size', (done) => {
    request.get('http://localhost:8080/api/news?size=10' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(10);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('sorted by headlines', (done) => {
    request.get('http://localhost:8080/api/news?sort=Headlines' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(20);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('edge records', (done) => {
    request.get('http://localhost:8080/api/news?size=3000' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(2799);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('edge records, second page', (done) => {
    request.get('http://localhost:8080/api/news?page=1&size=2000' , (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.length).toBe(799);
      expect(body[0].Time).toBeDefined();
      expect(body[0].Headlines).toBeDefined();
      expect(body[0].Description).toBeDefined();
      done();
    });
  });

  it('negative page', (done) => {
    request.get('http://localhost:8080/api/news?page=-1' , (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("illegal query: -1, 20");
      done();
    });
  });

  it('non existing page', (done) => {
    request.get('http://localhost:8080/api/news?page=9999' , (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("illegal query: 9999, 20");
      done();
    });
  });

  it('negative size', (done) => {
    request.get('http://localhost:8080/api/news?size=-1' , (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("illegal query: 0, -1");
      done();
    });
  });

  it('non existing index', (done) => {
    request.get('http://localhost:8080/api/news?sort=Unknown' , (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe("illegal sort key: Unknown");
      done();
    });
  });

})

describe('Updating News', () => {

  it('fine', (done) => {
    const contents = { Headlines: 'Hello', Description: 'World' }
    request.put({
      uri: 'http://localhost:8080/api/news/0', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contents)
    }, (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.Id).toBe(0);
      expect(body.Time).toBeDefined();
      expect(body.Headlines).toBe("Hello");
      expect(body.Description).toBe("World");
      done();
    });
  });

  it('xss', (done) => {
    const contents = { Headlines: 'Hello', Description: 'World<script>alert(\'World\')</script>' }
    request.put({
      uri: 'http://localhost:8080/api/news/0', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contents)
    }, (error, response) => {
      if (response.statusCode != 200) console.log(response.body);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.Id).toBe(0);
      expect(body.Time).toBeDefined();
      expect(body.Headlines).toBe("Hello");
      expect(body.Description).toBe("World");
      done();
    });
  });

  it('bad id', (done) => {
    const contents = { Headlines: 'Hello', Description: 'World' }
    request.put({
      uri: 'http://localhost:8080/api/news/9999', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contents)
    }, (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('illegal id: 9999');
      done();
    });
  });

  it('bad request', (done) => {
    const contents = { Headlines: 'Hello' }
    request.put({
      uri: 'http://localhost:8080/api/news/0', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contents)
    }, (error, response) => {
      if (response.statusCode != 500) console.log(response.body);
      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.error).toBe('bad request: Hello, undefined');
      done();
    });
  });

})
