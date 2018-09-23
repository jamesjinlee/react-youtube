import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import debounce from 'lodash.debounce';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.search('pixar');
    //to timeout function for a certain amount of time
    this.search = debounce(this.search, 300);

    // youtubeSearch('pixar').then(videos => {
    //   this.setState({
    //     videos, // same as videos: videos
    //     selected
    //     Video: videos[0],
    //   });
    // });
  }

  // since this function done with arrow notation, no need to bind
  search = (text) => {
    youtubeSearch(text).then(videos => {
      this.setState({
        videos, // same as videos: videos
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar onSearchChange={this.search} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('main'));
