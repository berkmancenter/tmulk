#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );

const pkg = require( path.join( __dirname, 'package.json' ) );

const program = require( 'commander' );

const Twitter = require( 'twitter' );
const twitterCreds = require( './twitter.json' );
const tweetAttributes = [ 'created_at', 'id', 'text', 'source', 'retweet_count', 'favorite_count' ];

const tweetsPerRequest = 2;
const tweetMax = 4;

program
  .version( pkg.version )
  .usage( '<username ...>' )
  .parse( process.argv );

if ( !program.args.length ) {
  program.help();
}

let client = new Twitter( twitterCreds );
let currentHandle = '';
let currentTweets = [];

let p = null;

for ( var handle of program.args ) {
  currentHandle = handle;
  currentTweets = [];

  getTweetsPromise();
}

function getTweetsPromise( ) {
  p = new Promise( getTweets );

  p.then( getTweetsResolve );
}

function getTweetsResolve( val ) {
  currentTweets.push( ...val );

  if ( currentTweets.length >= tweetMax ) {
    console.log( currentTweets );
  } else {
    setTimeout( getTweetsPromise, 1000 );
  }
}

function getTweets( resolve, reject ) {
  let timelineReq = {
    screen_name: currentHandle,
    count: 2
  };

  if ( currentTweets.length > 0 ) {
    timelineReq.max_id = currentTweets[ currentTweets.length - 1 ].id_str;
    //timelineReq.page = Math.floor( currentTweets.length / tweetsPerRequest );
  }

  console.log( timelineReq );

  client.get( 'statuses/user_timeline', timelineReq, function( error, tweets, response ) {
    if ( !error ) {
      resolve( tweets.map( function( t ) {
        return {
          created_at: t.created_at,
          id: t.id,
          id_str: t.id_str,
          text: t.text,
          source: t.source,
          retweet_count: t.retweet_count,
          favorite_count: t.favorite_count
        }
      } ) );
    } else {
      reject( error );
    }
  } );


  
}
