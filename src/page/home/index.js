import React, { PureComponent } from 'react';
import 'xgplayer';
import FlvJsPlayer from 'xgplayer-flv.js';

// import Player from 'xgplayer';
// import 'xgplayer-mp4';

// import _ from 'lodash'

// import adiao from '../../video/adiao.mp4';
class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const player = new FlvJsPlayer({
      id: 'xg',
      url: 'https://pullws-live.genshuixue.com/mgclient/6007010277945481-2489960001.flv',
      // url: 'http://static.fxuetang.speiyou.com/1517366097463_6902252.mp4',
      // poster: './poster.png',
      isLive: true,
      preloadTime: 30,
      minCachedTime: 5,
      cors: true,
      flvOptionalConfig: {
        // fixAudioTimestampGap: false,
        enableWorker: true,
        // stashInitialSize: 500,
        // autoCleanupSourceBuffer: true,
        // enableWorker: true,
        // enableStashBuffer: false,
        // stashInitialSize: 120,
      },
    });

    // player.on();

  }

  render() {
    return (
      <div id="xg">
        {/* <h2> this is HomePage! </h2>
        <div className="img-test-1">test css!</div> */}
      </div>
    )
  }
}

export default Home
