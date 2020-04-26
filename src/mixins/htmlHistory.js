import queryString from 'query-string'

const ignoreValues = [undefined, null, 0, false]
export default {
  
  methods: {
    loadUrlQuery(callback) {
      const queries = queryString.parse(location.search)
      callback(queries)
    },

    writeUrlQuery (params) {
      // null と 0 の削除
      const values = Object.assign({}, params)
      for (const key of Object.keys(values)) {
        for (const ignore of ignoreValues) {
          if (values[key] === ignore) {
            delete values[key]
            break
          }
        }
      }

      const stringify = queryString.stringify(values, { sort: false })
      const path = [location.pathname, stringify].join('?')
      history.replaceState(null, null, path)
    },

    normalizeArray (val) {
      if (val) {
        if (Array.isArray(val)) {
          return val
        } else {
          return [val]
        }
      }
      return val
    }
  }
}
