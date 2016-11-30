'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /games when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/games");
  });


  describe('games', function() {

    beforeEach(function() {
      browser.get('index.html#!/games');
    });


    it('should render games when user navigates to /games', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('users', function() {

    beforeEach(function() {
      browser.get('index.html#!/users');
    });


    it('should render users when user navigates to /users', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
