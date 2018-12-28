const expect = require('chai').expect
const axios = require('axios')

describe("API Tests", function() {

  describe("/shorten", function() {

    it("should return a shortened URL", (done) => {
        const request = { url: "https://google.com" };
        axios.post('http://localhost:3000/shorten', request)
        .then(response => {
            expect(response.status).to.be(201)
            expect(response.body._id).to.be.ok
            expect(response.body.hash).to.be.ok;
            done();
        })
    });
  });
});
