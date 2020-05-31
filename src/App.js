import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery';

class App extends Component {
constructor(props) {
  super(props)
  this.state = {}
  // console.log("This is my intializer")

  // const movies = [
  //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w220_and_h330_face/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg", 
  //   title: "Birds of Prey", overview: "Aaa"},
  //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w220_and_h330_face/7W0G3YECgDAfnuiHG91r8WqgIOe.jpg", 
  //   title: "Trolls World Tour", overview: "Bbb"}
  // ]

  // var movieRows = []
  // movies.forEach((movie) => {
  //   console.log(movie.title)
  //   const movieRow = < MovieRow movie={movie} />
  //   movieRows.push(movieRow)
  // });

  // this.state = {rows: movieRows}

  this.performSearch("toy story")

}

performSearch(searchTerm) {
  // console.log("Perform search using moviedb")
  const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      console.log("Fetched data successfully.")
      // console.log(searchResults)
      const results = searchResults.results
      // console.log(results[0])

      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        // console.log(movie.poster_path)
        const movieRow = <MovieRow key={movie.id} movie={movie}/> // passing from MovieRow.js
        movieRows.push(movieRow)
        console.log(movieRows)
      });

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error("Failed to fetch data.")
    }
  })

}

searchChangeHandler(event) {
  console.log(event.target.value)
  const boundObject = this
  const searchTerm = event.target.value
  boundObject.performSearch(searchTerm)
}

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.png"/>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }}
        onChange={this.searchChangeHandler.bind(this)}
        placeholder="Enter search term"/>

        {this.state.rows}
      </div>
    );
  }
}
export default App;
