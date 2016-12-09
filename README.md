About
=====

tmulk is a command line tool to bulk download the maximum number of public tweets (3200) for a user on Twitter. It is written in and requires Node.js 6+.

Usage
=====

    node tmulk.js <username>

Example:

    node tmulk.js ryanttb

tmulk outputs all the tweet JSON to standard output. It also outputs debug information to standard error. Since, by default, node outputs both console.log and console.warn to the console, the output of the above command will not be valid JSON as debug information is mixed in. **You should redirect standard output to a file**.

    node tmulk.js ryanttb > ryanttb.json

You will get status messages on the console and the JSON output will be valid and saved to a file.

    $ node tmulk.js ryanttb > ryanttb.json
    [start] handle: ryanttb
    [get] { screen_name: 'ryanttb', count: 200 }
    [progress] handle: ryanttb, length: 200
    [get] { screen_name: 'ryanttb', count: 200, max_id: '770668489539543040' }
    [progress] handle: ryanttb, length: 198
    ...
    [progress] handle: ryanttb, length: 23
    [end] handle: ryanttb

Setup
=====

First, install any dependencies by using npm:

    $ npm install

The only other setup you have to do is save your Twitter Application keys and access tokens in a file named twitter.json. There is a template file, twitter.json.example, included in the repository so you can copy that to twitter.json to edit.

You can create a Twitter App and view its keys and access tokens on https://apps.twitter.com/

Once dependencies are installed and your credentials are saved to twitter.json, you can run node tmulk.js

Rate limiting
=============

tmulk abides by Twitter's API rate limits. It will not attempt to download more than 3,200 tweets and will not go faster than 180 calls every 15 minutes.

That is assuming you are using a single Twitter App's access tokens. If you run more than tmulk simultaneously using the same access tokens, you will be rate limited and one or more instances will not download all the tweets available.

Private accounts
================

If the account from which you're downloading tweets is private or has been deleted, tmulk will get an authorization error.

    node tmulk.js gailcat22 > gailcat22.json
    [start] handle: gailcat22
    [get] { screen_name: 'gailcat22', count: 200 }
    [error] handle: gailcat22, reason: Error: HTTP Error: 401 Authorization Required

The output, gailcat22.json, will contain an empty array.

    []
    

