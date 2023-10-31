// _data/webmentions.js
const fs = require("fs");
const fetch = require("node-fetch");
const unionBy = require("lodash/unionBy");
const domain = require("./site.json").domain;

// Load .env variables with dotenv
require("dotenv").config();

// Define Cache Location and API Endpoint
const WEBMENTION_CACHE_FILE = "_cache/webmentions.json";
const WEBMENTION_API = process.env.WEBMENTION_API;
const WEBMENTION_TOKEN = process.env.WEBMENTION_TOKEN;

async function fetchWebmentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !WEBMENTION_TOKEN) {
    console.warn(">>> unable to fetch webmentions: missing domain or token");
    return false;
  }

  let url = `${WEBMENTION_API}/mentions.jf2?domain=${domain}&token=${WEBMENTION_TOKEN}&per-page=${perPage}`;
  if (since) {
    url += `&since=${since}`; // only fetch new mentions
  }

  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `>>> ${feed.children.length} new webmentions fetched from ${WEBMENTION_API}`
    );
    return feed;
  }

  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  if (b.length === 0) {
    return a;
  }
  let union = unionBy(a, b, "wm-id");
  union.sort((a, b) => {
    let aDate = new Date(a.published || a["wm-received"]);
    let bDate = new Date(b.published || b["wm-received"]);
    return aDate - bDate;
  });
  return union;
}

// save combined webmentions in cache file
function writeToCache(data) {
  const dir = "_cache";
  const fileContent = JSON.stringify(data, null, 2);
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // write data to cache json file
  fs.writeFile(WEBMENTION_CACHE_FILE, fileContent, (err) => {
    if (err) {
      throw err;
    }
    console.log(`>>> webmentions cached to ${WEBMENTION_CACHE_FILE}`);
  });
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(WEBMENTION_CACHE_FILE)) {
    const cacheFile = fs.readFileSync(WEBMENTION_CACHE_FILE);
    return JSON.parse(cacheFile);
  }

  // no cache found
  return {
    lastFetched: null,
    children: [],
  };
}

const updateWebmentions = async function () {
  const cached = readFromCache(WEBMENTION_CACHE_FILE) || {
    lastFetched: null,
    webmentions: [],
  };

  // Only fetch new mentions in production
  const fetchedAt = new Date().toISOString();
  const newWebmentions = await fetchWebmentions(cached.lastFetched);
  if (newWebmentions) {
    const webmentions = {
      lastFetched: fetchedAt,
      webmentions: mergeWebmentions(
        cached.webmentions,
        newWebmentions.children
      ),
    };

    writeToCache(webmentions, WEBMENTION_CACHE_FILE);
  }
};

updateWebmentions();
