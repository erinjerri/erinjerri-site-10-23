import express from 'express'
import payload from 'payload'

// eslint-disable-next-line
require('dotenv').config()

import { seed } from './seed'

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async (): Promise<void> => {
  await payload.init({
    secret: 'JIdsvwkj07',
    mongoURL: 'mongodb://127.0.0.1/portfolio-website',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    payload.logger.info('Seeding Payload...')
    await seed(payload)
    payload.logger.info('Done.')
  }

  app.listen(process.env.PORT || 3000)
}

start()
