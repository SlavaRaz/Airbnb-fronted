import fs from 'fs'

export const utilService = {
  readJsonFile,
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getTimeStampXDaysAgo,
  getTimeStampXDaysFromNow,
  objectToSearchParams,
  formattedDate,
  ShortFormattedDate,
  totalDays

}

function readJsonFile(path) {
  const str = fs.readFileSync(path, 'utf8')
  const json = JSON.parse(str)
  return json
}

export function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return (data) ? JSON.parse(data) : undefined
}

function getTimeStampXDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.getTime()
}

function getTimeStampXDaysFromNow(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.getTime()
}

function ShortFormattedDate(timeStamp) {
  const date = new Date(timeStamp)
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
}

function totalDays(startDate, endDate) {
  const diffTime = Math.abs(endDate - startDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))

}

function objectToSearchParams(obj) {
  let searchParams = new URLSearchParams()
  function flattenObject(obj, parentKey) {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const newKey = parentKey ? `${parentKey}[${key}]` : key
      if (typeof value === 'object' && value !== null) {
        flattenObject(value, newKey)
      } else {
        searchParams.set(newKey, value)
      }
    })
  }
  flattenObject(obj)
  return searchParams.toString()
}

function formattedDate(timeStamp) {
  const date = new Date(timeStamp)
  return String(date.getDate()).padStart(2, '0') + "/" + String((date.getMonth() + 1)).padStart(2, '0') + "/" + date.getFullYear()
}

