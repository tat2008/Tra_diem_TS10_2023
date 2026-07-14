const request = require(`request`);
const fs = require(`fs`);
const wait = require(`util`).promisify(setTimeout);

let begin = 1000;
const end = 202048;

async function crawlData() {
    while (begin <= end) {
        begin++;
        const options = {
            url: `https://hanoimoi.vn/api/getdiemthi2023`,
            method: `POST`,
            formData: {
                t: 2,
                q: begin.toString().padStart(6, 0)
            }
        };
        request(options, function (error, response, body) {
            console.log(body);
            fs.appendFileSync(`KQMH_hanoimoi.json`, JSON.stringify(JSON.parse(body)) + `,\n`);
        });
        await wait(500);
    };
};

crawlData();