exports.Minute = 60
exports.Hour = 60*exports.Minute
exports.Day = 24*exports.Hour
exports.Week = 7*exports.Day
exports.Month = 30*exports.Day

exports.NoCache = "NoCache" // Only used as a constant

exports.HeaderKey = 'Cache-Control'
exports.NoCacheKey = 'no-cache'
exports.MaxAgeKey = 'max-age'
exports.MustRevalidateKey = 'must-revalidate'

// Cache-Control: max-age=3600, must-revalidate
// Cache-Control: no-cache
// max age is in seconds

exports.forADay    = function(response) { exports.cache(response, exports.Day) }
exports.forAWeek   = function(response) { exports.cache(response, exports.Week) }
exports.forAnHour  = function(response) { exports.cache(response, exports.Hour) }
exports.forAMonth  = function(response) { exports.cache(response, exports.Month) }


exports.cache = function(response, value) {
    
    // sends down the right headers to cache an express
    // response object

    if (value == exports.NoCache) return exports.noCache(response)
    
    response.header(exports.HeaderKey, exports.MaxAgeKey + "=" + value + ", " + exports.MustRevalidateKey)
}

exports.forSeconds = exports.cache

exports.noCache = function(response) {
    
    // specifies not to cache this response
    response.header(exports.HeaderKey, exports.NoCacheKey)
    
}

exports.dontCache = function(req, res, next) {
	res.header('Cache-control', 'no-cache')
	next()
}

exports.cacheHourly = function(req, res, next) {
    exports.cache(res, exports.Hour)	    
    next()
}

exports.cacheDaily = function(req, res, next) {
    exports.cache(res, exports.Day)	    
    next()
}

exports.cacheMonthly = function(req, res, next) {
    exports.cache(res, exports.Month)	    
    next()
}

exports.cacheMinute = function(req, res, next) {
    exports.cache(res, exports.Minute)
    next()
}