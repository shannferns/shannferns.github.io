// Function to determine the appropriate statistical test based on user inputs
function determineStatisticalTest() {
  const ivType = document.getElementById('ivType').value;
  const dvType = document.getElementById('dvType').value;
  const purpose = document.getElementById('purpose').value;
  const sampleSize = document.getElementById('sampleSize').value;
  const numIVs = parseInt(document.getElementById('numIVs').value);

  // Check the purpose, sample size, number of IVs, and recommend the appropriate statistical test
  if (purpose === 'test difference') {
    // Check if the sample size is known and less than 30
    if (sampleSize === 'lessThan30') {
      return 'Paired t-test or Wilcoxon signed-rank test';
    }

    // Check if the IV is categorical and the number of IVs is 2 or more
    if (ivType === 'categorical' && numIVs >= 2) {
      return 'ANOVA';
    }

    // Check if the IV and DV are categorical or continuous
    if (ivType === 'categorical' && dvType === 'categorical') {
      return 'Chi-squared test';
    } else if (ivType === 'categorical' && dvType === 'continuous') {
      return 'Independent samples t-test or Mann-Whitney U test';
    } else if (ivType === 'continuous' && dvType === 'continuous') {
      return 'Independent samples t-test or Mann-Whitney U test';
    }
  } else if (purpose === 'relationship') {
    // Check if the sample size is known and less than 30
    if (sampleSize === 'lessThan30') {
      return 'Spearman or Kendall correlation';
    }

    // Check if the IV is categorical and the number of IVs is 2 or more
    if (ivType === 'categorical' && numIVs >= 2) {
      return 'ANOVA';
    }

    // Check if the IV and DV are categorical or continuous
    if (ivType === 'categorical' && dvType === 'continuous') {
      return 'ANOVA or Kruskal-Wallis test';
    } else if (ivType === 'continuous' && dvType === 'continuous') {
      return 'Pearson correlation';
    }
  } else if (purpose === 'predict') {
    // Check if the sample size is known and less than 30
    if (sampleSize === 'lessThan30') {
      return 'Multiple regression (with caution due to small sample size)';
    }

    // Check if the IV is categorical and the number of IVs is 2 or more
    if (ivType === 'categorical' && numIVs >= 2) {
      return 'Multiple regression';
    }

    // Check if the IV and DV are categorical or continuous
    if (ivType === 'categorical' && dvType === 'continuous') {
      return 'Simple linear regression or logistic regression';
    } else if (ivType === 'continuous' && dvType === 'continuous') {
      return 'Multiple linear regression';
    }
  }

  // If no valid combination is found, return an error message
  return 'Unable to determine the appropriate statistical test.';
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const recommendedTest = determineStatisticalTest();
  document.getElementById('result').textContent = 'Recommended Statistical Test: ' + recommendedTest;
}

// Add event listener to the form submit event
const testForm = document.getElementById('testForm');
testForm.addEventListener('submit', handleFormSubmit);
