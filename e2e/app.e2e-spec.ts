import { P4uPage } from './app.po';

describe('p4u App', function() {
  let page: P4uPage;

  beforeEach(() => {
    page = new P4uPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
