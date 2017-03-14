import { RameshrasaiyanPage } from './app.po';

describe('rameshrasaiyan App', function() {
  let page: RameshrasaiyanPage;

  beforeEach(() => {
    page = new RameshrasaiyanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
