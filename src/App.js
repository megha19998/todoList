import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
      notes:[]
     }
  }

  API_METHOD = "http://localhost:5053";

  componentDidMount() {
    this.refreshnotes();
  }

  async refreshnotes() {
    fetch(this.API_METHOD+"/api/todoapp/GetNotes").then(response => response.json())
    .then(data => {
      this.setState({notes:data});
    })
  }

  async addClick() {
    var newNote = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes",newNote);
    fetch(this.API_METHOD+"/api/todoapp/AddNotes/", {
      method: "POST",
      body: data 
    }).then(res => res.json())
    .then((result) => {
      alert(result);
      this.refreshnotes();
    })
  }

  async deleteClick(id) {
    fetch(this.API_METHOD+"/api/todoapp/DeleteNote?id="+id, {
      method: "DELETE",
    }).then(res => res.json())
    .then((result) => {
      alert(result);
      this.refreshnotes();
    })
  }

  render() {
      const{notes} = this.state;
      return (
        <div className="App">
          <h1>To Do App </h1>
          <input id="newNotes"/>&nbsp;
          <button onClick={() =>this.addClick()}>Add Notes</button>
          {notes.map(note=> 
            <p>
              <b>* {note.description}</b>&nbsp;
              <button onClick={() =>this.deleteClick(note.id)}>Delete Task</button>
            </p>  
          )}
        </div>
      );
  }
  
}


export default App;
