const { google } = require('googleapis');
const keys = require('./keys.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']

);
app.listen(port, () => { console.log('We are live on ' + port); });

client.authorize(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Connected!');
        gsrun(client)
    }
});

async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });

    const opt = {
        spreadsheetId: '1UPHc01i9nQBAXEsAVIVLCY0FOlNdIwIPQ0PZIb5d3jE',
        range: 'A2:D'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values);

}
