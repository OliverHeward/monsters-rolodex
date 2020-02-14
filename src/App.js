import React from 'react';
import './App.css';
import {CardList} from './Components/CardList/CardList';
import {SearchBox} from './Components/SearchBox/SearchBox';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  };

  // Arrow function automatically binds (this) for us.
  // (lexical scoping)
  handleChange = e => {
    this.setState({ searchField: e.target.value})
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users }))
    console.log('component mounted');
  }

  render() {
    // Array destructuring
    const { monsters, searchField } = this.state;
    const filteredMonster = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder="search monsters"
          handleChange={this.handleChange} />
        <CardList monsters={filteredMonster} />
      </div>
    );
  };
};

export default App;