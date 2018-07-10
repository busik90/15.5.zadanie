App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });

    this.getGif(searchingText)
    .then(gif => {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    })
    .catch(error => alert(`Coś poszło nie tak: ${error}`));
  },

  getGif: function(searchingText, callback) {
    return new Promise( function(resolve, reject) {
      const url = `http://api.giphy.com/v1/gifs/search?q=${searchingText}&api_key=dc6zaTOxFJmzC`,
            xhr = new XMLHttpRequest();

      xhr.open(`GET`, url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText).data,
                gif = {
                  url: data[0].images.original.url,
                  sourceUrl: data[0].url
                };
          console.log(data);
  
          resolve(gif);
        }
      };
      xhr.onerror = () => reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
      xhr.send();
    });
  },

  render: function() {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search 
          onSearch={this.handleSearch}
        />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});