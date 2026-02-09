const BASE_PRICES = {
  simple_site: 300,
  ecommerce: 600,
  enterprise: 1200,
};

const PAGE_COST = {
  simple_site: 40,
  ecommerce: 70,
  enterprise: 120,
};

const FEATURE_COST = {
  low: 80,
  medium: 150,
  high: 250,
};

function estimateCost(projectType, numPages, features = []) {
  const base = BASE_PRICES[projectType] || 0;
  const perPage = PAGE_COST[projectType] || 0;

  const pageCost = numPages * perPage;

  const featureCost = features.reduce((sum, f) => {
    const tier = FEATURE_COST[f.complexity] || 0;
    return sum + tier;
  }, 0);

  const rawTotal = base + pageCost + featureCost;
  const total = Math.round(rawTotal * 1.1); // +10% buffer

  return total;
}

module.exports = { estimateCost };
