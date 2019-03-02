import getBabel from '..';

test('Babel returns the moduleDev config', () => {
  expect(getBabel('moduleDev')).toMatchSnapshot();
});

test('Babel returns the moduleProd config', () => {
  expect(getBabel('moduleProd')).toMatchSnapshot();
});

test('Babel returns the es5 config', () => {
  expect(getBabel('es5')).toMatchSnapshot();
});

test('Babel returns the node config', () => {
  expect(getBabel('node')).toMatchSnapshot();
});
