var chai = require('chai');
var expect = chai.expect;
var model = require('../model');

describe('model test', function(){
    
    it('getUser', function(){
        model.getUser(1, function(err, resp) {
            expect(resp[0].user_id).to.be(1);
        })
    });

    it('getAllBoards', function(){
        model.getAllBoards(1, function(err, resp) {
            expect(resp.length).to.be.greaterThan(0);
        })
    });

    it('getAllPostsFromBoard', function(){
        model.getAllPostsFromBoard(1, function(err, resp) {
            expect(resp.length).to.be.greaterThan(0);
        })
    });

    it('getPost', function(){
        model.getPost(1, function(err, resp) {
            expect(resp[0].post_id).to.be(1);
        })
    });

    it('addPostToBoard', function(){
        model.addPostToBoard(1, 1, 'test post', function(err, resp) {
            expect(resp[0].post_id).to.be(1);
        })
    });

});
