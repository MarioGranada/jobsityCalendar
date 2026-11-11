import React from 'react';
import Footer from './Footer';
import renderer from 'react-test-renderer';

test('Footer should be rendered', () => {
  const component = renderer.create(<Footer />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
