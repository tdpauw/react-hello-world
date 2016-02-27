var Navbar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Hello</a>
          </div>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#"></a></li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

var Home = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Hello, world!</h1>
          <p></p>
        </div>
      </div>
    );
  }
});

var App = React.createClass({

  render: function() {
    return (
        <div>
          <Navbar />
          <Home />
        </div>
      );
  }
});

ReactDOM.render(<App />,
  document.getElementById("app")
);
