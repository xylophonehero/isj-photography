import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { FaRegEnvelope } from 'react-icons/fa'

function encode(data)
{
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) =>
  {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) =>
  {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render()
  {
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h2 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">Contact me</h2>
                <hr />
                <div className="columns">
                  <div className="column is-6">
                    <p>
                      If you have any questions then please contact me by email or fill out the form and I will get back to you as quickly as possible.
                </p>
                    <p className="is-flex is-align-content-baseline is-size-3">

                      <a href="mailto:isjphoto@hotmail.co.uk"><FaRegEnvelope size="1.5rem" /> isjphoto@hotmail.co.uk</a>
                    </p>
                  </div>
                  <div className="column is-6">


                    <form
                      name="contact v1"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={this.handleSubmit}
                    >
                      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                      <input type="hidden" name="form-name" value="contact v1" />
                      <div hidden>
                        <label>
                          Don’t fill this out:{' '}
                          <input name="bot-field" onChange={this.handleChange} />
                        </label>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'name'}>
                          Your name
                  </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'text'}
                            name={'name'}
                            onChange={this.handleChange}
                            id={'name'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'email'}>
                          Email
                  </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'email'}
                            name={'email'}
                            onChange={this.handleChange}
                            id={'email'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'phone'}>
                          Phone Number
                  </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'phone'}
                            name={'phone'}
                            onChange={this.handleChange}
                            id={'phone'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'message'}>
                          Message
                  </label>
                        <div className="control">
                          <textarea
                            className="textarea"
                            name={'message'}
                            onChange={this.handleChange}
                            id={'message'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <button className="button is-link" type="submit">
                          Send
                  </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
