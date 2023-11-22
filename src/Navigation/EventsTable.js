import { Fragment, useState, Component } from 'react'


export default function EventsTable(props) {
    let data = props.data;
    let result = data.result;
    return(
        <div class="py-8 flex object-center justify-center items-center relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="object-center justify-center text-sm text-center text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    RaceName
                </th>
                <th scope="col" class="px-6 py-3">
                    Distance
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">View Results</span>
                </th>

            </tr>
        </thead>
        <tbody>
            {result.map((item, i) => {
                return [
                <tr key = {i} class="bg-blue-300 border-b dark:bg-gray-800 dark:border-gray-900 hover:bg-blue-400 dark:hover:bg-gray-900">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item[1]}
                </th>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item[3]}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item[2]}
                </td>
                <td class="px-6 py-4 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Race Page</a>
                </td>
            </tr>
                ];
            })}
        </tbody>
    </table>
</div>
        )
};

