import queryString from 'query-string'

const HIDDEN_VALUES = [undefined, null, 0, false, '']
const QUERY_OBJECT_NAME = 'queries'

export default {
  data: function () {
    return {
      queryDefaultValues: {}
    }
  },

  async created () {
    // 初期値のクローン
    this.queryDefaultValues = Object.assign({}, this[QUERY_OBJECT_NAME])

    // beforeRouteUpdate が不発になるので代替
    const eventHandler = async () => {
      await this.init()
    }
    window.addEventListener('popstate', eventHandler)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('popstate', eventHandler)
    })

    await this.init()
  },

  methods: {
    init () {
      // override
      console.log("Override 'this.init()'!")
    },

    loadUrlQuery () {
      // url の値を this[queryObjectName] にセットする
      const urlQueries = queryString.parse(location.search)
      const data = this[QUERY_OBJECT_NAME] || {}

      // dataを一つ一つ見ていく
      for (let key of Object.keys(data)) {
        const dataValue = data[key]
        const queryValue = urlQueries[key]
        
        let pushValue = queryValue
        if (queryValue !== undefined) {
          // key が url にあるなら置換
          switch (typeof(dataValue)) {
            case 'number': pushValue = Number(queryValue); break;
            case 'boolean': pushValue = Boolean(queryValue); break;
            case 'object':
              if (Array.isArray(dataValue)) {
                pushValue = this.normalizeArray(queryValue)
              }
              break;
          }
        } else {
          // key が url に無いならデフォルト値
          pushValue = this.queryDefaultValues[key]
        }

        this.$set(this[QUERY_OBJECT_NAME], key, pushValue)
      }
    },

    writeUrlQuery (replace = false) {
      // this[queryObjectName] の値を url にセットする
      const data = Object.assign({}, this[QUERY_OBJECT_NAME])

      // null などの除外する文字列を削除
      for (const key of Object.keys(data)) {
        for (const hidden of HIDDEN_VALUES) {
          if (data[key] === hidden) {
            delete data[key]
            break
          }
        }
      }

      // url にセット
      const stringify = queryString.stringify(data, { sort: false })
      const path = [location.pathname, stringify].join('?')

      if (replace) {
        history.replaceState(null, null, path)
      } else {
        history.pushState(null, null, path)
      }
    },

    // 単数と複数の値をすべて配列へ
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
