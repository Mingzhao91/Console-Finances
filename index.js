var finances = [
  ["Jan-2010", 867884],
  ["Feb-2010", 984655],
  ["Mar-2010", 322013],
  ["Apr-2010", -69417],
  ["May-2010", 310503],
  ["Jun-2010", 522857],
  ["Jul-2010", 1033096],
  ["Aug-2010", 604885],
  ["Sep-2010", -216386],
  ["Oct-2010", 477532],
  ["Nov-2010", 893810],
  ["Dec-2010", -80353],
  ["Jan-2011", 779806],
  ["Feb-2011", -335203],
  ["Mar-2011", 697845],
  ["Apr-2011", 793163],
  ["May-2011", 485070],
  ["Jun-2011", 584122],
  ["Jul-2011", 62729],
  ["Aug-2011", 668179],
  ["Sep-2011", 899906],
  ["Oct-2011", 834719],
  ["Nov-2011", 132003],
  ["Dec-2011", 309978],
  ["Jan-2012", -755566],
  ["Feb-2012", 1170593],
  ["Mar-2012", 252788],
  ["Apr-2012", 1151518],
  ["May-2012", 817256],
  ["Jun-2012", 570757],
  ["Jul-2012", 506702],
  ["Aug-2012", -1022534],
  ["Sep-2012", 475062],
  ["Oct-2012", 779976],
  ["Nov-2012", 144175],
  ["Dec-2012", 542494],
  ["Jan-2013", 359333],
  ["Feb-2013", 321469],
  ["Mar-2013", 67780],
  ["Apr-2013", 471435],
  ["May-2013", 565603],
  ["Jun-2013", 872480],
  ["Jul-2013", 789480],
  ["Aug-2013", 999942],
  ["Sep-2013", -1196225],
  ["Oct-2013", 268997],
  ["Nov-2013", -687986],
  ["Dec-2013", 1150461],
  ["Jan-2014", 682458],
  ["Feb-2014", 617856],
  ["Mar-2014", 824098],
  ["Apr-2014", 581943],
  ["May-2014", 132864],
  ["Jun-2014", 448062],
  ["Jul-2014", 689161],
  ["Aug-2014", 800701],
  ["Sep-2014", 1166643],
  ["Oct-2014", 947333],
  ["Nov-2014", 578668],
  ["Dec-2014", 988505],
  ["Jan-2015", 1139715],
  ["Feb-2015", 1029471],
  ["Mar-2015", 687533],
  ["Apr-2015", -524626],
  ["May-2015", 158620],
  ["Jun-2015", 87795],
  ["Jul-2015", 423389],
  ["Aug-2015", 840723],
  ["Sep-2015", 568529],
  ["Oct-2015", 332067],
  ["Nov-2015", 989499],
  ["Dec-2015", 778237],
  ["Jan-2016", 650000],
  ["Feb-2016", -1100387],
  ["Mar-2016", -174946],
  ["Apr-2016", 757143],
  ["May-2016", 445709],
  ["Jun-2016", 712961],
  ["Jul-2016", -1163797],
  ["Aug-2016", 569899],
  ["Sep-2016", 768450],
  ["Oct-2016", 102685],
  ["Nov-2016", 795914],
  ["Dec-2016", 60988],
  ["Jan-2017", 138230],
  ["Feb-2017", 671099]
];

// ------------------------------------ Calculation Functions ------------------------------//
// Get the total number of months
function getMonthsTotal(financesArray) {
  // store month-year string in this array, e.g. ["Jan-2017","Feb-2017"]
  let monthsYearsArray = [];

  // return null if financesArray is empty
  if (isArrayEmpty(financesArray)) return null;

  // loop throught items in financesArray
  financesArray.forEach((monthFinanceArray) => {
    // add month-year string("Jan-2017") if it isn't in monthsYearsArray
    // to avoid counting the duplicated date in financesArray
    if (
      !isArrayEmpty(monthFinanceArray) &&
      typeof monthFinanceArray[0] === "string" &&
      monthsYearsArray.indexOf(monthFinanceArray[0] < 0)
    ) {
      monthsYearsArray.push(monthFinanceArray[0]);
    }
  });

  return monthsYearsArray.length;
}

// Get the net total amount of Profit/Losses over the entire period
function getNetTotal(financesArray) {
  let netTotal = 0;

  // return null if financesArray is empty
  if (isArrayEmpty(financesArray)) return null;

  // loop throught items in financesArray
  financesArray.forEach((monthFinanceArray) => {
    if (
      !isArrayEmpty(monthFinanceArray) &&
      typeof monthFinanceArray[1] === "number"
    ) {
      // sum up net total amount of Profit/Losses for each item
      netTotal += monthFinanceArray[1];
    }
  });

  return netTotal;
}

// calculate the avergage of changes in  Profit/Losses over the entire period
function getAvgChanges(financesArray) {
  let avgChanges = 0;

  // return null if financesArray is empty
  if (isArrayEmpty(financesArray)) return null;

  // use the reduce function to calculate the sum of the changes in Profit/Losses
  const sumChanges = financesArray.reduce((accVal, currItem, index, arr) => {
    let currAccVal = 0;

    if (index === 0) {
      // the change is the profit/loss of the first item
      currAccVal = currItem[1];
    } else {
      const prevItem = arr[index - 1];
      // calculate the difference between current selected month and its previous month
      const diffInMonth = currItem[1] - prevItem[1];
      // sum up the difference with previous accmulation for the next interaction
      currAccVal = accVal + diffInMonth;
    }

    return currAccVal;
  }, 0);

  // average changes = sumChanages / total number of months
  // round the result to 2 decimal places
  avgChanges = parseFloat((sumChanges / getMonthsTotal(finances)).toFixed(2));

  return avgChanges;
}

// Get the greatest increase/decrease in profits (date and amount) over the entire period.
// If toGetIncreaseInProfit is true, the function returns the greatest increase in profits, otherwise, it
// returns the greatest loses in profits.
function getGreatestIncOrDecInProfilts(financesArray, toGetIncreaseInProfit) {
  // return null if financesArray is empty
  if (isArrayEmpty(financesArray)) return null;

  // Use reduce function to compare profit from month to month to find the greatest increase/decrease profit.
  // The result is an object that contains dateStr and profit properties.
  const result = financesArray.reduce((accVal, currItem, index, arr) => {
    const prevItem = arr[index - 1];
    const diffInMonth = currItem[1] - prevItem[1];
    let currAccVal = null;

    if (index === 1) {
      // set the accumulator value to the first comparision result
      currAccVal = { dateStr: currItem[0], profit: diffInMonth };
    } else if (index >= 1) {
      // If toGetIncreaseInProfit is true and the calculated profit is greater than the profit that is stored from the current accumulator's profit or
      // If toGetIncreaseInProfit is false and the calculated profit is smaller than the profit that is stored from the current accumulator's profit
      // update the accumulator according to this month data, otherwise, return the current accumulator.
      if (
        (toGetIncreaseInProfit && diffInMonth > accVal.profit) ||
        (!toGetIncreaseInProfit && diffInMonth < accVal.profit)
      ) {
        currAccVal = { dateStr: currItem[0], profit: diffInMonth };
      } else {
        currAccVal = accVal;
      }
    }

    return currAccVal;
  });

  return result;
}

// ------------------------------------ Utility Functions ------------------------------//
// Check if an array is empty, return true if an array is empty.
function isArrayEmpty(array) {
  return !(array && Array.isArray(array) && array.length > 0);
}

// ------------------------------------ Print Out The Data Analysis in Console ------------------------------//
// get all data from functions
const netTotal = getNetTotal(finances);
const monthsTotal = getMonthsTotal(finances);
const avgChanges = getAvgChanges(finances);
const greatestProfit = getGreatestIncOrDecInProfilts(finances, true);
const greatestLost = getGreatestIncOrDecInProfilts(finances, false);

// print out the analysis to the console
console.log(`
Financial Analysis
----------------------------
Total Months: ${monthsTotal}
Total: $${netTotal}
Average  Change: $${avgChanges}
Greatest Increase in Profits: ${greatestProfit.dateStr} ($${greatestProfit.profit})
Greatest Decrease in Profits: ${greatestLost.dateStr} ($${greatestLost.profit})
`);
