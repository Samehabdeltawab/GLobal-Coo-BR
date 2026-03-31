function extracttestcaseId(title) {
    const match = title.match(/\[(\d+)\]/); // Matches patterns like [402938]
    return match ? match[1] : null;
  }
  
  module.exports = { extracttestcaseId };