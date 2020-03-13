import * as dateFns from 'date-fns'
import { ja } from 'date-fns/locale'

import duration from 'format-duration'
import roundTo from 'round-to'

const formatNumberDigit = function(val) {
  if (val === 0) {
    return 0
  }
  if (val) {
    return val.toLocaleString()
  }
  return '-'
}
const formatNumberFixed = function(val, digit = 0) {
  if (val) {
    return roundTo(val, digit)
  }
  return '-'
}
const formatNumber = function(val, digit = 0) {
  const fx = formatNumberFixed(val, digit)
  const dg = formatNumberDigit(fx)
  return dg
}

const formatDatetime = function(val, fotmat = 'yyyy-MM-dd(E) HH:mm:ss') {
  if (val) {
    return dateFns.format(new Date(val), fotmat, { locale: ja })
  }
  return '-'
}
const formatHumanize = function(val) {
  if (val) {
    return dateFns.formatDistanceToNow(new Date(val), { addSuffix: true, locale: ja })
  }
  return '-'
}
const formatDatetimeHumanize = function(val) {
  const dt = formatDatetime(val)
  const hn = formatHumanize(val)
  return `${dt} (${hn})`
}

const formatDuration = function(val) {
  if (val) {
    return duration(val * 1000)
  }
  return '-'
}

const formatDays = function(val) {
  if (val) {
    return dateFns.differenceInDays(new Date(), new Date(val))
  }
}

const funcs = {
  formatNumberDigit,
  formatNumberFixed,
  formatNumber,
  formatDatetime,
  formatHumanize,
  formatDatetimeHumanize,
  formatDuration,
  formatDays
}

export default {
  filters: funcs,
  methods: funcs
}
