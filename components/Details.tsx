import axios from 'axios';
import classnames from 'classnames';
import useSWR from 'swr';
import Link from "next/link";
import ReactMarkdown from 'react-markdown'

interface Props {
    element: {
        number: number;
        name: string;
        symbol: string;
        'cpk-hex': string;
        category: string;
        summary: string;
    }

}

export async function fetcher(name: string) {
    try {
        const {data} = await axios.get(`https://api.npms.io/v2/package/${name.toLowerCase()}`)
        return data
    } catch (e) {
        return undefined;
    }
}

export function Details({element}: Props) {

    const {number, name, symbol, category} = element;

    const {data: pkg} = useSWR(name, fetcher);


    return (
        <div
            className="fixed right-10 top-10 bottom-10 bg-gray-900/95 z-30 p-10 rounded-lg overflow-y-auto overflow-x-hidden max-w-[50%]">
            <div>
                <div className="text-4xl pb-2">
                    {element.name}
                </div>

                <div className="pb-3">
                    {element.summary}
                </div>
            </div>

            <div>
                README:
            </div>


            <ReactMarkdown className="readme">
                {pkg?.collected?.metadata?.readme}
            </ReactMarkdown>
        </div>
    )
}
