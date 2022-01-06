import { Fragment, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Element } from '../components/Element';

export async function fetcher() {
  const { data } = await axios.get('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');

  return data.elements
}

const x = 18;
const y = 18;

export default function Home() {
  const { data: elements = [] } = useSWR('periodic-table', fetcher);
  const [hover, setHover] = useState({ x: -1, y: -1 });

  return (
    <div>

      <div className="container mx-auto">
        <h1
          className="text-2xl font-medium text-left py-10 text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600">
          <div>THE</div>
          <div>PERIODIC</div>
          <div>TABLE</div>
          <div><i className="font-light">of</i></div>
          <div>PACKAGES</div>
        </h1>

        <div className="flex items-center justify-center">
          <div className="elements" onMouseLeave={() => setHover({ x: -1, y: -1 })}>
            {Array.from(Array(y)).map((_, y) => (
              <Fragment key={y}>
                {Array.from(Array(x)).map((_, x) => {
                  const element = elements.find(e => e.xpos === x + 1 && e.ypos === y + 1);

                  if (!element) {
                    return <div className="empty" key={x} data-x={x} data-y={y}
                                onMouseOver={() => setHover({ x: -1, y: -1 })} />
                  }

                  return (
                    <div key={x} data-x={x} data-y={y}>
                      {element && <Element element={element}
                                           onHover={setHover}
                                           x={x}
                                           y={y}
                                           hover={hover} />}
                    </div>
                  )
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
