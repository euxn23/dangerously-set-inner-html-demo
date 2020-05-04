import React from 'react';
import ReactDOM from 'react-dom';
import { JSDOM } from 'jsdom';

const App = () => {
  const htmltext = `
<html>
<script>
  console.log('attack from jsdom')
</script>
<style>
  .red {
    background: red;
  }
</style>
<body>
  <div>
    <button class="red" onClick="alert('attack from event handler')">Click Me</button>
  </div>
</body>
</html>`;

  const { window } = new JSDOM(htmltext);
  window.document.body
    .querySelectorAll('[onClick]:not([onClick=""])')
    .forEach((el) => el.removeAttribute('onClick'));
  const __html = `
<body>
<style>
${Array.from(window.document.querySelectorAll('style')).map(
  (styleTag) => styleTag.innerHTML
)}
</style>
${window.document.body.innerHTML}
</body>
`;

  return <div dangerouslySetInnerHTML={{ __html }}></div>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
