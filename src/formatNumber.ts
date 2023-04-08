import { chunkAtEnd, isNumber, zeroPad } from "./utils";
import { numberUnits, tenUnits, thousandUnits } from "./constant";

export function formatNumber(format: number | string | null = "") {
  if (!isNumber(Number(format))) {
    return "";
  }

  return chunkAtEnd(String(format), 4)
    .reduce((acc, item, index) => {
      const unit = thousandUnits[index] ?? "";

      if (!Number(item)) {
        return acc;
      }

      return `${Number(item)}${unit} ${acc}`;
    }, "")
    .trim();
}

export function formatNumberAll(format: number | string | null = "") {
  if (!isNumber(Number(format))) {
    return "";
  }

  return chunkAtEnd(String(format), 4)
    .reduce((acc, item, index) => {
      let numberUnit = "";

      const zeroItem = zeroPad(item, 4);

      for (let i = 0; i < 4; i++) {
        const number = Number(zeroItem[i]);

        if (number) {
          const unit = tenUnits[3 - i];

          numberUnit += `${
            unit && number === 1 ? "" : numberUnits[number]
          }${unit}`;
        }
      }

      const thousandUnit = thousandUnits[index] ?? "";

      return `${numberUnit}${numberUnit ? thousandUnit : ""} ${acc}`;
    }, "")
    .trim();
}
