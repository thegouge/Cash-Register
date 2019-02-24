export function checkCashRegister(price, cash, cid) {
  const values = [
    {
      name: "ONE HUNDRED",
      val: 100
    },
    {
      name: "TWENTY",
      val: 20
    },
    {
      name: "TEN",
      val: 10
    },
    {
      name: "FIVE",
      val: 5
    },
    {
      name: "ONE",
      val: 1
    },
    {
      name: "QUARTER",
      val: 0.25
    },
    {
      name: "DIME",
      val: 0.1
    },
    {
      name: "NICKEL",
      val: 0.05
    },
    {
      name: "PENNY",
      val: 0.01
    }
  ];

  // creating variable for amount of change due
  let changeDue = cash - price;

  // creating an array of more detailed objects for cash in drawer
  const registerChange = cid.map((change) => {
    let index;
    values.some((obj, i) => {
      index = i;
      return obj.name === change[0];
    });
    return {
      name: change[0],
      value: Math.round(values[index].val * 100) / 100,
      total: Math.round(change[1] * 100) / 100
    };
  });
  registerChange.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    } else if (a.value < b.value) {
      return 1;
    } else {
      return 0;
    }
  });

  // variable for the total amount in the drawer
  let drawerTotal =
    Math.round(
      registerChange.reduce((tot, curr) => {
        return tot + curr.total;
      }, 0) * 100
    ) / 100;

  const changeGiven = [];

  // loops while there's still change due
  for (let i = 0; changeDue > 0 && i < registerChange.length; i++) {
    let contribution = 0;
    let change = registerChange[i];
    // loops while there's still more of the denomination to contribute to change
    for (change.total; change.total > 0; change.total -= change.value) {
      let check = changeDue - change.value;
      if (check >= 0) {
        contribution += change.value;
        changeDue = Math.round((changeDue - change.value) * 100) / 100;
        drawerTotal = Math.round((drawerTotal - change.value) * 100) / 100;
      } else {
        change.total = 0;
      }
    }
    if (contribution > 0) {
      changeGiven.push([change.name, contribution]);
    }
  }

  // checks the status of the register vs the change due
  if (changeDue > 0) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
  } else if (drawerTotal === 0) {
    return {
      status: "CLOSED",
      change: cid
    };
  } else {
    return {
      status: "OPEN",
      change: changeGiven
    };
  }
}

const price = document.getElementById("price").value;
const cash = document.getElementById("cash-paid").value;
const inputs = [...document.getElementsByClassName("input")].map((input) => [
  input.id.toUpperCase(),
  input.value
]);
const output = document.getElementById("output");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  const registerStatus = checkCashRegister(price, cash, inputs);
  const changeLeft = registerStatus.change
    .map((denom) => {
      return `${denom[1].toFixed(2)} dollars worth of ${denom[0]}`;
    })
    .join("<br/>");

  output.innerHTML =
    "the status of the register is: " +
    registerStatus.status +
    "<br/><br/>" +
    "the change given for the transaction is: <br/>" +
    changeLeft;
});
