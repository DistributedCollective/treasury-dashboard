import { bignumber } from 'mathjs';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const prettyTx = (tx: string) =>
  `${tx.substring(0, 6)}...${tx.substr(tx.length - 5, 5)}`;

export const toChecksumAddress = (address: string) => {
  try {
    return !!address ? address.toLocaleLowerCase() : '';
  } catch (e) {
    return address;
  }
};

export const tokenBalance = (
  tokenAmount: string,
  decimals: number,
  tokenDecimals: number = 18,
) => {
  return Number(
    bignumber(tokenAmount)
      .div(10 ** tokenDecimals)
      .toFixed(decimals),
  );
};

export const tokenBalanceFormatted = (
  tokenAmount: string,
  decimals: number,
  tokenDecimals: number = 18,
) => {
  return tokenBalance(tokenAmount, decimals, tokenDecimals).toLocaleString(
    undefined,
    { minimumFractionDigits: decimals, maximumFractionDigits: decimals },
  );
};

const networks: Record<number, string> = {
  1: 'Ethereum',
  30: 'RSK',
  31: 'RSK testnet',
  56: 'Binance Smart Chain',
  97: 'BSC testnet'
};

export const chainIdToNetworkName = (chainId: number) =>
  networks[chainId] || '';

export const ifGenesisThen = (value: string, fallback: string) =>
  value.toLowerCase() === ZERO_ADDRESS ? fallback : value;

type Sort = 'asc' | 'desc';

export const sortByField =
  <T = object>(
    field: keyof T,
    order: Sort = 'asc',
    fn: (value: any) => any = value => value,
  ) =>
  (a: T, b: T) => {
    if (order === 'asc') {
      return fn(a[field]) < fn(b[field]) ? -1 : 1;
    } else {
      return fn(a[field]) < fn(b[field]) ? 1 : -1;
    }
  };
