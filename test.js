const expect = require("chai").expect;
const axios = require("axios");

describe("API Tests", function() {
  let id, hash, hits;
  describe("/shorten", function() {
    it("should return a shortened URL", done => {
      const request = { url: "https://google.com" };
      axios.post("http://localhost:5000/shorten", request).then(response => {
        id = response.data._id;
        hash = response.data.hash;
        hits = response.data.hits;
        expect(response.status).to.equal(201);
        expect(response.data._id).to.be.ok;
        expect(response.data.hash).to.be.ok;
        done();
      });
    });
    it("should return the same shortened URL for the earlier url", done => {
      const request = { url: "https://google.com" };
      axios.post("http://localhost:5000/shorten", request).then(response => {
        expect(response.status).to.equal(201);
        expect(response.data._id).to.equal(id);
        expect(response.data.hash).to.equal(hash);
        done();
      });
    });
    it("should return a shorten url", done => {
      const request1 = { url: "https://youtube.com"};
      let hash 
      axios.post("http://localhost:5000/shorten", request1).then(response1 => {
        expect(response1.status).to.equal(201);
        hash = response1.data.hash
        const request2 = { url: "https://youtube.com", maxHits: 6};
        return axios.post("http://localhost:5000/shorten",request2)

      }).then(response2 => {
        expect(response2.data.hash).to.not.equal(hash)
        const request3 = {url: "https://youtube.com"};
        return axios.post("http://localhost:5000/shorten",request3)
        
      }).then(response3 => {
        expect(response3.data.hash).to.equal(hash)
        done()
      })

    })
  });

  describe("/:hash", function() {
    it.only("should redirect the user for an existing hash", done => {
      axios.get("http://localhost:5000/" + hash).then(response => {
        expect(response.data).to.contain("google.com");
        done();
      });
    });
    it("should return the hits of the hash url", done => {
      axios.get(`http://localhost:5000/hits?hash=${hash}`).then(response => {
        expect(response.data.hits).to.equal(hits + 1);
        done();
      });
    });
    it("should increment the hits of the hash url", done => {
      const request = { url: "https://google.com" };
      axios.post("http://localhost:5000/shorten", request).then(response => {
        expect(response.data.hits).to.equal(hits + 1);
        done();
      });
    });
    it("should not redirect if we used till maxHits", done => {
      const request = { url: "https://google.com", maxHits: 5 }
      axios.post("http://localhost:5000/shorten", request).then(response => {
        expect(response.data.maxHits).to.equal(5)
        done()
      });
    });

    it("should return error if hash is not exist", done => {
      axios.get("http://localhost:5000/" + hash + "ghjgf").catch(err => {
        expect(err.response.status).to.equal(404);
        done();
      });
    });
  });
});
