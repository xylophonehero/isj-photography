import React from 'react'
import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

export const Transform = (content) =>
{
  content = remark()
    .use(recommended)
    .use(remarkHtml)
    .processSync(content).toString();

  return (
    content
  )
}

const HTMLBlock = ({ content, spacing = 2 }) =>
{
  return (
    <div className="columns">
      <div className={`column is-${12 - spacing * 2} is-offset-${spacing}`}>
        <div dangerouslySetInnerHTML={{ __html: Transform(content) }} />
      </div>
    </div>
  )
}

export default HTMLBlock
