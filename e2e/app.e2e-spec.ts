import { PolysynthPage } from './app.po';

describe('polysynth App', function() {
  let page: PolysynthPage;

  beforeEach(() => {
    page = new PolysynthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
