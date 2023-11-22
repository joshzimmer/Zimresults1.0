import { Fragment, useState, Component } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTable } from 'react-table'
import "../App.css"
import EventsTable from "./EventsTable.js"
class FutureEventsClass extends Component {
    constructor(props) {
        super(props);
        this.state = {data : {result: [1, 2]}, tableOutput : true, isLoading : false};
    }

    componentDidMount() {
        this.setState({tableOutput : false});
        fetch('https://corsproxy.io/?https://n0nhj9ge18.execute-api.us-west-2.amazonaws.com/beta/rid?query=futureEvents',
                {headers:{
                    "accepts":"application/json",
                }
            }).then(response => response.json())
            .then(json => this.setState({ data : json}))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({tableOutput : true})
            })
    }

  render(){
  return (
<div class="py-8 bg-blue-300 justify-center items-center" style={{minHeight: "100vh", flex: 0}} >
    <div class="py-5 container mx-auto bg-blue-500 rounded-lg p-14">
    <h1 class="text-center font-bold text-white text-4xl">Upcoming Races</h1>

    </div>
    {this.state.tableOutput ? (<div><EventsTable data={ this.state.data}/>  </div>
            ) : ( <div class="text-2xl justify-center items-center text-center mt-10">Loading...</div>
            )}
</div>



  );
}
};


export default FutureEventsClass;

