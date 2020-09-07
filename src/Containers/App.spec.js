import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('Test Home page content', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
  expect(root.querySelector('h1').textContent).toBe('Choice Técnico - Toolbox');
  expect(root.querySelector('.data-list').textContent).toBe('Loading...');
  expect(root.querySelector('.btn-primary').textContent).toBe('Submit');
});