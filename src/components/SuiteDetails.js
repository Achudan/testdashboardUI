import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import {Link} from 'react-router-dom'

class SuiteDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suiteName: this.props.location.state.xmlSuiteName,
            dates: [],
        }
    }
    componentDidMount(props) {
        if (this.state.suiteName !== this.props.location.state.xmlSuiteName) {
            this.setState({ suiteName: this.props.location.state.xmlSuiteName })
        }
    }

    getData() {
        axios.get(
            "https://morning-dusk-51584.herokuapp.com/getXMLDetails/" + this.props.location.state.xmlSuiteName
        ).then(
            (res) => {
                this.setState({ dates: res.data })
            }
        )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }
    componentWillMount() {
        this.getData()
    }


    render() {
        return (
            <div className="App">
                <div>
                    <div className="title">
                        <h1>All runs till now</h1>
                    </div>
                </div>
                {this.state.dates.map((runDates, key) => (
                    <ListGroup key={key}>
                        <Link to={{pathname:`/${this.state.suiteName}/${runDates}` , state: {xmlSuiteName:this.props.location.state.xmlSuiteName, xmlSuiteRunDates:runDates}}}>
                        <ListGroup.Item action >
                            {runDates}
                        </ListGroup.Item>
                        </Link>
                    </ListGroup>
                )
                )
                }
            </div>
        )
    }
}

export default SuiteDetails;
