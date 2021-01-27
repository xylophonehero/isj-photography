import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset, widgetFor, widgetsFor }) =>
{
  const data = entry.getIn(['data']).toJS()
  console.log(data)
  const timelineImages = []
  for (var object in data.timelineImages)
  {
    timelineImages.push(
      {
        image: getAsset(object.image),
        text: object.text
      }
    )
  }
  console.log(timelineImages)
  if (data)
  {
    return (
      <IndexPageTemplate
        // image={getAsset(data.image)}
        // title={data.title}
        // heading={data.heading}
        // subheading={data.subheading}
        // description={data.description}
        // // intro={data.intro || { blurbs: [] }}
        // mainpitch={data.mainpitch || {}}
        timelineImages={data.timelineImages}
        ieashiaPhoto={getAsset(data.ieashiaPhoto)}
        content={widgetFor('body')}
      />
    )
  } else
  {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
