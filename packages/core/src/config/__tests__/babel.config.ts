import getBabel from '../babel.config';

test('Babel returns for development', () => {
  expect(getBabel('development')).toMatchSnapshot();
});

test('Babel returns for production', () => {
  expect(getBabel('production')).toMatchSnapshot();
});
