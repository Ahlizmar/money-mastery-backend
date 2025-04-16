// algorithms/newsFeed.js
const NEWSDATA_KEY = 'pub_75706901055c8e978edeaad5acb16ecc61c86';

async function getFinanceNews() {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${NEWSDATA_KEY}&q=personal+finance&language=en`);
  const data = await res.json();
  return data.results?.slice(0, 5) || [];
}

module.exports = getFinanceNews;
