// import { API_BASE_URL, API_KEY } from '../../config';

// self.addEventListener('message', async ({ data }) => {
//     let { type, payload } = data;
//     if (type === 'FETCH_RESTAURANTS') {
//         const queryParams = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
//         const options = {
//             headers: {
//                 'user-key': API_KEY
//             }
//         }
//         const response: any = await fetch(`${API_BASE_URL}/search?${queryParams}`, options);
//         const totalRecords = response && response.data ? response.data.results_found : 0;
//         const restaurants = response && response.data ? response.data.restaurants.map((x: any) => x.restaurant) : [];
//         const result = {
//             totalRecords: totalRecords,
//             restaurants: restaurants
//         };
//         console.log(result);
//         self.postMessage({ type: 'RESTAURANTS_FETCH_RESPONSE', result: result }, '');
//     }
// });

// self.addEventListener('exit', () => {
//     process.exit(0);
// }, false);

/* eslint-disable */

export default () => {
    setInterval(() => {
        self.postMessage("howdy", '');
    }, 1000)
  }