import {Fragment, useState} from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {Element} from '../components/Element';
import {Details} from '../components/Details';
import {useRouter} from "next/router";
import Link from 'next/link';

export async function fetcher() {
    const {data} = await axios.get('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json');

    return data.elements
}

const x = 18;
const y = 18;

export default function Home() {
    const {data: elements = []} = useSWR('periodic-table', fetcher);
    const [hover, setHover] = useState({x: -1, y: -1});

    const {query} = useRouter();

    const [selected] = [query.element].flat() as string[]

    const selectedElement = elements.find(e => e.name.toLowerCase() === selected);

    return (
        <div>

            <div className="2xl:container mx-auto pb-10 px-10">
                <div className="flex justify-between py-10">
                    <h1
                        className="text-2xl font-medium text-left text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600">
                        <div>THE</div>
                        <div>PERIODIC</div>
                        <div>TABLE</div>
                        <div><i className="font-light">of</i></div>
                        <div>PACKAGES</div>
                    </h1>

                    <Link href="https://github.com/jackall3n/periodic">
                        <a target="_blank" rel="noreferrer noopener">
                            <svg className="text-white w-6 h-6" role="img" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"><title>GitHub</title>
                                <path
                                    fill="currentColor"
                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                        </a>

                    </Link>
                </div>

                {selectedElement && (
                    <Details element={selectedElement}/>
                )}

                <div className="flex items-center justify-center">
                    <div className="elements" onMouseLeave={() => setHover({x: -1, y: -1})}>
                        {Array.from(Array(y)).map((_, y) => (
                            <Fragment key={y}>
                                {Array.from(Array(x)).map((_, x) => {
                                    const element = elements.find(e => e.xpos === x + 1 && e.ypos === y + 1);

                                    if (!element) {
                                        return <div className="empty" key={x} data-x={x} data-y={y}
                                                    onMouseOver={() => setHover({x: -1, y: -1})}/>
                                    }

                                    return (
                                        <div key={x} data-x={x} data-y={y}>
                                            {element && <Element element={element}
                                                                 onHover={setHover}
                                                                 x={x}
                                                                 y={y}
                                                                 hover={hover}/>}
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
