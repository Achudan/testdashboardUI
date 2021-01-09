import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './style.css'
import {Link} from 'react-router-dom'
// import { connect } from 'react-redux'
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        xmlsuites:[],
    }   
}
getData(){
  axios.get(
    "https://morning-dusk-51584.herokuapp.com/getallxml"
).then(
    (res) => {
      console.log(res.data)
        this.setState({ xmlsuites: res.data })
    }
)
    .catch(
        (error) => {
            console.log(error)
        }
    )
}
componentWillMount(){
    this.getData()
}

  render(){
  return (
    <div className="App">
      <div>
            <div className="title">
                <h1>Test Dash Board</h1>
                <p>An effective dashboard to view live test run updates</p>
            </div>
           <div className="cards col-md-12">
                <div className="row padding">
                    {this.state.xmlsuites.map(  (xmlName,key) =>  ( 
                        <div className="col-md-4 padding" key={key}> 
                            <Card>
                                <Card.Body>
                                <Card.Title>{xmlName}</Card.Title>
                                    {/* <Card.Text>
                                        <TotalCase sname={xmlName}/>
                                    </Card.Text> */}
                                    {/* <Redirect to={{ pathname: `/${this.state.userId}`, state: { userid: this.state.userId } }} /> */}
                                    <Link to={{pathname:`/${xmlName}` , state: {xmlSuiteName:xmlName}}}>
                                        <Button variant="primary">More Info</Button>
                                    </Link>
                                </Card.Body>
                            </Card>   
                        </div>     
                        ) 
                        )
                    }   
                </div>
            </div>
        </div>
    </div>
  )
                  }
}

export default App;
