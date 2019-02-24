import {checkCashRegister} from "./index.js";

let output;

beforeEach(() => {
  output = null;
});

describe("Palindrome Checker", () => {
  it("Should return an Object", () => {
    output = checkCashRegister(19.5, 20, [
      ["PENNY", 0.01],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ]);

    expect(typeof output).toBe("object");
  });

  it("Should let you know if there wasn't enough money in cash drawer for exact change", () => {
    output = checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]
    ]);

    expect(output.change[0][0]).toBe("QUARTER");
    expect(output.change[0][1]).toBe(0.5);
    expect(output.status).toBe("OPEN");
  });

  it("Should let you know the status of the register after the transaction", () => {
    output = checkCashRegister(19.5, 20, [
      ["PENNY", 0.5],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ]);
    expect(output.status).toBe("CLOSED");

    output = checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]
    ]);
    expect(output.status).toBe("OPEN");
  });

  it("Should tell you the exact change to be given", () => {
    output = checkCashRegister(19.5, 20, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]
    ]);

    expect(output.change[0][0]).toBe("QUARTER");
    expect(output.change[0][1]).toBe(0.5);
    expect(output.status).toBe("OPEN");
  });

  it("Should describe exact change", () => {
    output = checkCashRegister(3.26, 100, [
      ["PENNY", 1.01],
      ["NICKEL", 2.05],
      ["DIME", 3.1],
      ["QUARTER", 4.25],
      ["ONE", 90],
      ["FIVE", 55],
      ["TEN", 20],
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]
    ]);

    expect(output.status).toBe("OPEN");
    expect(output.change[0][0]).toBe("TWENTY");
    expect(output.change[0][1]).toBe(60);

    expect(output.change[1][0]).toBe("TEN");
    expect(output.change[1][1]).toBe(20);

    expect(output.change[2][0]).toBe("FIVE");
    expect(output.change[2][1]).toBe(15);

    expect(output.change[3][0]).toBe("ONE");
    expect(output.change[3][1]).toBe(1);

    expect(output.change[4][0]).toBe("QUARTER");
    expect(output.change[4][1]).toBe(0.5);

    expect(output.change[5][0]).toBe("DIME");
    expect(output.change[5][1]).toBe(0.2);

    expect(output.change[6][0]).toBe("PENNY");
    expect(output.change[6][1]).toBe(0.04);
  });
});
