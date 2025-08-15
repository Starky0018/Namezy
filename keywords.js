const trendingKeywords = {};

function logKeyword(keyword) {
  keyword = keyword.trim().toLowerCase();
  if (!keyword) return;
  trendingKeywords[keyword] = (trendingKeywords[keyword] || 0) + 1;
}

function getTrendingKeywords(limit = 10) {
  return Object.entries(trendingKeywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({ keyword, count }));
}

module.exports = { logKeyword, getTrendingKeywords };