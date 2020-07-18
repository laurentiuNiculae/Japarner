function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        let response = {}

        let wordQuery = {}
        if (req.query.knowledgeLevel) {
            wordQuery.knowledgeLevel = { $in: req.query.knowledgeLevel.split(',') }
        }
        if (req.query.labels) {
            wordQuery.labels = { $in: req.query.labels.split(',') }
        }
        wordQuery.ownerId = req.user._id.toString()
        const results = {}
        if (endIndex < await model.countDocuments(wordQuery).exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find(wordQuery).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

module.exports.paginatedResults = paginatedResults