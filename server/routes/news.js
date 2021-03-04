import News from '../services/news.js'

/** 
 * @typedef Error
 * @property {string} error - error description
 */
const register = (app) => {

	/**
	 * Get news.
	 * @route GET /api/news
	 * @group News - News data
   * @produces application/json
	 * @returns {[News.model]} 200 - An array of product information info
	 * @returns {Error} 500 - system error
	 */
	app.get('/api/news', (req, res) => {
    const page = req.query.page || 0;
    const size = req.query.size || 20;
    const sortBy = req.query.sort || 'Time'
		News.find(page, size, sortBy)
      .then(news => res.status(200).send(news))
      .catch(err => res.status(500).json({ error: err }))
	});

  app.put('/api/news/:id', (req, res) => {
    News.findAndUpdate(parseInt(req.params.id), req.body)
      .then(rec => res.status(200).send(rec))
      .catch(err => res.status(500).json({ error: err }))
	});

}	

export default { register };
