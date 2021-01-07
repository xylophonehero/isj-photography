import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

const Transform = (content) =>
{
  content = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(content).toString();

  return content
}

export default Transform