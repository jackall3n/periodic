import axios from 'axios';
import classnames from 'classnames';
import useSWR from 'swr';

interface Props {
  element: {
    number: number;
    name: string;
    symbol: string;
    'cpk-hex': string;
    category: string;
  }
  onHover(options: { x: number, y: number }): void;
  x: number;
  y: number;
  hover: { x: number, y: number };
}

export async function fetcher(name: string) {
  try {
    const { data } = await axios.get(`https://api.npms.io/v2/package/${name.toLowerCase()}`)
    return data
  } catch (e) {
    return undefined;
  }
}

// Combine the colors as they're all the same apart from the prefix, the only reason they're separate
// is because tailwind is in JIT mode and without the `text-` or `bg-` it removes the classes
const TEXT_COLORS = {
  "diatomic nonmetal": 'text-yellow-300',
  "actinide": 'text-green-300',
  "lanthanide": 'text-blue-300',

  "transition metal": 'text-blue-400',
  "unknown, probably transition metal": 'text-blue-400',

  "post-transition metal": 'text-green-500',
  "unknown, probably post-transition metal": 'text-green-500',

  "noble gas": 'text-yellow-700',
  "unknown, predicted to be noble gas": 'text-yellow-700',

  "alkaline earth metal": 'text-purple-300',

  "metalloid": 'text-green-300',
  "unknown, probably metalloid": 'text-green-300',

  "alkali metal": 'text-red-500',
  "unknown, but predicted to be an alkali metal": 'text-red-500',

  "polyatomic nonmetal": 'text-yellow-500',
}

const BG_COLORS = {
  "diatomic nonmetal": 'bg-yellow-300',
  "actinide": 'bg-green-300',
  "lanthanide": 'bg-blue-300',

  "transition metal": 'bg-blue-400',
  "unknown, probably transition metal": 'bg-blue-400',

  "post-transition metal": 'bg-green-500',
  "unknown, probably post-transition metal": 'bg-green-500',

  "noble gas": 'bg-yellow-700',
  "unknown, predicted to be noble gas": 'bg-yellow-700',

  "alkaline earth metal": 'bg-purple-300',

  "metalloid": 'bg-green-300',
  "unknown, probably metalloid": 'bg-green-300',

  "alkali metal": 'bg-red-500',
  "unknown, but predicted to be an alkali metal": 'bg-red-500',

  "polyatomic nonmetal": 'bg-yellow-500',
}

export function Element({ element, onHover, x, y, hover }: Props) {
  const { number, name, symbol, category } = element;

  const { data: pkg } = useSWR(name, fetcher);

  const active = x === hover.x && y === hover.y;
  const xBorder = x === hover.x;
  const yBorder = y === hover.y;
  const highlight = xBorder || yBorder;

  // Pls god improve this
  const className = classnames(
    "flex flex-col flex border py-2 -m-px px-2 relative cursor-pointer transition text-right",
    {

      [BG_COLORS[category]]: active,
      [TEXT_COLORS[category]]: !active || !highlight,
      'border-opacity-0 text-black': active,
      'border-white/10 bg': !active || !highlight,
      'border-y-white/100': !active && yBorder,
      'border-x-white/100': !active && xBorder,
      'z-10': highlight,
      'z-20': active,
      'text-opacity-20': !pkg
    }
  )

  function onMouseOver() {
    if (!pkg) {
      return onHover({ x: -1, y: -1 })
    }

    onHover({ x, y })
  }

  return (
    <a href={`https://npmjs.com/${name.toLowerCase()}`} target="_blank" rel="noreferrer noopener">
      <div className={className} onMouseOver={onMouseOver} title={category}>
        <div className="text-xs flex-1">{number}</div>
        <div className="font-semibold">
          {symbol}
        </div>
        <div className="name">{name}</div>
      </div>
    </a>
  )
}
