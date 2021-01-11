import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios';

class EachTestCases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runDates: this.props.location.state.xmlSuiteRunDates,
            currentTestRunData: {}
        }
    }
    componentDidMount(props) {
        if (this.state.runDates !== this.props.location.state.xmlSuiteRunDates) {
            this.setState({ runDates: this.props.location.state.xmlSuiteRunDates })
        }
    }
    getData() {
        console.log(this.props.location.state.xmlSuiteName)
        console.log(this.props.location.state.xmlSuiteRunDates)
        axios.get(
            "https://morning-dusk-51584.herokuapp.com/getListOfDetails/" + this.props.location.state.xmlSuiteName + "/" + this.state.runDates
        ).then(
            (res) => {
                this.setState({ currentTestRunData: res.data })
                console.log(this.state.currentTestRunData)
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
        const getStatus= (sts) => {
            // let CREATED = -1;
            // let SUCCESS = 1;
            // let FAILURE = 2;
            // let SKIP = 3;
            // let SUCCESS_PERCENTAGE_FAILURE = 4;
            // let STARTED = 16;
            if(sts === "16")
            {
                return(
                <div>
                    <p>RUNNING</p>
                    <ProgressBar animated variant="info" now={100} />
                </div>    
                )
            }
            else if(sts === "1")
            {
                return(
                <div>
                    <p>PASS</p>
                    <ProgressBar animated variant="success" now={100} />
                </div>
                )
            }
            else if(sts === "-1")
            {
                return(<p>CREATED</p>)
            }
            else if(sts === "2")
            {
                return(
                    <div>
                    <p>FAILURE</p>
                    <ProgressBar animated variant="danger" now={100} />
                </div>
                )
            }
            else if(sts === "3")
            {
                return(<p>SKIP</p>)
            }
            else if(sts === "4")
            {
                return(<p>SUCCESS_PERCENTAGE_FAILURE</p>)
            }
            else if(sts.startsWith("Total"))
            {
                return(<p>{sts}</p>)
            }
            else{
                return(<p>STATUS UNKNOWN</p>)
            }
        }
        return (
            <div >
                <div>
                    <span className="welcomeMessage">{this.state.runDates}</span>
                </div>
                <ListGroup>
                    {
                        // eslint-disable-next-line
                        Object.keys(this.state.currentTestRunData).map((tcName,key) => {
                                return(
                                < ListGroup.Item key={key}> 
                                { tcName }
                                {console.log(this.state.currentTestRunData[tcName])}
                                {
                                    Object.keys(this.state.currentTestRunData[tcName]).map((tcMethod,key) => {
                                        return(
                                            < ListGroup.Item key={key}>
                                                {tcMethod}
                                                {getStatus(this.state.currentTestRunData[tcName][tcMethod]['status'])}
                                            </ListGroup.Item >
                                        )
                                    })
                                    
                                }
                                </ListGroup.Item>)
                         })
                }
                </ListGroup>
                
            </div >
        )
    }
}

export default EachTestCases
