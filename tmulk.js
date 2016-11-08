#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );

const pkg = require( path.join( __dirname, 'package.json' ) );

const program = require( 'commander' );

const Twitter = require( 'twitter' );
const twitterCreds = require( './twitter.json' );
const tweetAttributes = [ 'created_at', 'id', 'text', 'source', 'retweet_count', 'favorite_count' ];

program
  .version( pkg.version )
  .usage( '<username ...>' )
  .parse( process.argv );

if ( !program.args.length ) {
  program.help();
}

let client = new Twitter( twitterCreds );
var currentHandle = '';
var currentTweets = [];

for ( var handle of program.args ) {
  currentHandle = handle;
  currentTweets = [];

  let promise = new Promise( getTweets );

  promise.then( function( val ) {
    console.log( val );
  } );
}

function getTweets( resolve, reject ) {
  let timelineReq = {
    screen_name: currentHandle,
    count: 2
  };

  client.get( 'statuses/user_timeline', timelineReq, function( error, tweets, response ) {
    if ( !error ) {
      resolve( tweets.map( function( t ) {
        return {
          created_at: t.created_at,
          id: t.id,
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
