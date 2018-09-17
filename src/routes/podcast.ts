import * as Router from 'koa-router'
import { config } from 'config'
import { getPodcast, getPodcasts } from 'controllers/podcast'
import { validatePodcastSearch } from 'middleware/validation/search'

const router = new Router({ prefix: `${config.apiPrefix}/podcast` })

// Search
router.get('/',
  validatePodcastSearch,
  async ctx => {
    const podcasts = await getPodcasts(ctx.request.query)
    ctx.body = podcasts
  })

// Get
router.get('/:id',
  async ctx => {
    const podcast = await getPodcast(ctx.params.id)
    ctx.body = podcast
  })

export default router