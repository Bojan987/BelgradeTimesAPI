import fetch from "node-fetch";

export const getCurrencyRates = async (req, res, next) => {
  try {
    const usd = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/usd/rates/today"
    );

    const eur = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/eur/rates/today"
    );

    const gbr = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/gbp/rates/today"
    );

    const chf = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/chf/rates/today"
    );

    const rub = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/rub/rates/today"
    );

    const jpy = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/jpy/rates/today"
    );

    const cad = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/cad/rates/today"
    );

    const aud = await fetch(
      "https://kurs.resenje.org/api/v1/currencies/aud/rates/today"
    );

    const usdLIST = await usd.json();
    const eurLIST = await eur.json();
    const gbrLIST = await gbr.json();
    const chfLIST = await chf.json();
    const rubLIST = await rub.json();
    const jpyLIST = await jpy.json();
    const cadLIST = await cad.json();
    const audLIST = await aud.json();

    const usdDATA = {
      code: usdLIST.code,
      parity: usdLIST.parity,
      exchange_buy: usdLIST.exchange_buy,
      exchange_middle: usdLIST.exchange_middle,
      exchange_sell: usdLIST.exchange_sell
    };

    const eurDATA = {
      code: eurLIST.code,
      parity: eurLIST.parity,
      exchange_buy: eurLIST.exchange_buy,
      exchange_middle: eurLIST.exchange_middle,
      exchange_sell: eurLIST.exchange_sell
    };

    const gbrDATA = {
      code: gbrLIST.code,
      parity: gbrLIST.parity,
      exchange_buy: gbrLIST.exchange_buy,
      exchange_middle: gbrLIST.exchange_middle,
      exchange_sell: gbrLIST.exchange_sell
    };

    const chfDATA = {
      code: chfLIST.code,
      parity: chfLIST.parity,
      exchange_buy: chfLIST.exchange_buy,
      exchange_middle: chfLIST.exchange_middle,
      exchange_sell: chfLIST.exchange_sell
    };

    const rubDATA = {
      code: rubLIST.code,
      parity: rubLIST.parity,
      exchange_buy: rubLIST.exchange_buy,
      exchange_middle: rubLIST.exchange_middle,
      exchange_sell: rubLIST.exchange_sell
    };

    const jpyDATA = {
      code: jpyLIST.code,
      parity: jpyLIST.parity,
      exchange_buy: jpyLIST.exchange_buy,
      exchange_middle: jpyLIST.exchange_middle,
      exchange_sell: jpyLIST.exchange_sell
    };

    const cadDATA = {
      code: cadLIST.code,
      parity: cadLIST.parity,
      exchange_buy: cadLIST.exchange_buy,
      exchange_middle: cadLIST.exchange_middle,
      exchange_sell: cadLIST.exchange_sell
    };

    const audDATA = {
      code: audLIST.code,
      parity: audLIST.parity,
      exchange_buy: audLIST.exchange_buy,
      exchange_middle: audLIST.exchange_middle,
      exchange_sell: audLIST.exchange_sell
    };

    const currency = [];
    currency.push(usdDATA,
      eurDATA,
      gbrDATA,
      chfDATA,
      rubDATA,
      jpyDATA,
      cadDATA,
      audDATA);

    res.json({
      currency
    });
  } catch (err) {
    next(err);
  }
};
