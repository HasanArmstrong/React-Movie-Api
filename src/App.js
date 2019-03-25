import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./navbar";
import Example from "./slider";
import Random from "./loadMore"


class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      isLoaded: false,
      pageNumber: 1
    };
    
  }

  LoadMoreHandlier = () => {
    this.setState({
    pageNumber: this.state.pageNumber +=1
    })
    this.componentDidMount()
    }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=4f125a892f7e9d15096f56d3778de58f&page=" + this.state.pageNumber
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.results
        });
      });
  }
  

    
  // Hasan Attempt at filtering movies
  getValue = (val) => {
    this.setState({ 
      items: this.state.items.filter(item => item.title.toLowerCase().includes(val))
      
    })
  };

  toggleAPI = () => {
    alert("hello");
  }


  render() {
      
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Navbar handlesubmit={this.getValue} click={this.toggleAPI}  />

          <div className="container">
           
            <div className="row">
              <div className="col-3 d-flex flex-column">
            <h4 className="mt-2">Year</h4>
           <Example />
           <h4>Rating</h4>
           <Example />
              </div>
              <div className="col-9">
                <ul className="d-flex flex-wrap justify-content-right col-12">
                  {/* Every three movies create new row */}
                  <div className="row">
                    {items.map(item => (
                      <div className="col-4">
                        <li key={item.id} className="custom-li">
                          <div className="card custom-card">
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                              <p className="card-text">
                                Rating:{item.vote_average}/10
                              </p>
                              <img
                                className="card-img-top"
                                src={
                                  "https://image.tmdb.org/t/p/w500/" +
                                  item.poster_path
                                }
                                alt="Card image cap"
                              />
                              <p className="card-text">{item.overview}</p>
                              <a href="#" className="btn btn-primary">
                                See more
                              </a>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </div>
                </ul>
                <Random click={this.LoadMoreHandlier}/>
              </div>
             
            </div>
        
          </div>
       
        </div>
      );

    }
  }

}

export default App;
