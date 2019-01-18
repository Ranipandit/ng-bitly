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
  });

  describe("/:hash", function() {
    it("should redirect the user for an existing hash", done => {
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
    // it("should not redirect if we used till maxHits", done => {
    //   axios.get("http://localhost:5000/" + hash).then(response => {
    //     expect(response.data.maxHits).to.equal(maxHits)
    //     done()
    //   });
    // });

    // it.only("should return error if hash is not exist", done => {
    //   axios.get("http://localhost:5000/" + hash + "ghjgf").catch(err => {
    //     expect(err.response.status).to.equal(404);
    //     done();
    //   });
    // });
  });
});
