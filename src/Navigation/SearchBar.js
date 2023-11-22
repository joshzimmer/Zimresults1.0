import { Fragment, useState, Component } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTable } from 'react-table'
import "../App.css"
import SearchTable from "./SearchTable.js"
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { first_name : "example", last_name: "name", input: "", selectedValue : 'Run', data : {result: [1, 2]},
         apiFirstLast : 'https://corsproxy.io/?https://n0nhj9ge18.execute-api.us-west-2.amazonaws.com/beta/rid?query=firstLastSearch&',
         apiFirst : 'https://corsproxy.io/?https://n0nhj9ge18.execute-api.us-west-2.amazonaws.com/beta/rid?query=firstSearch&',
        link2 : 'https://corsproxy.io/?https://n0nhj9ge18.execute-api.us-west-2.amazonaws.com/beta/rid?query=firstLastSearch&first_name=Josh&last_name=Zimmer',
        link1 : 'https://corsproxy.io/?https://n0nhj9ge18.execute-api.us-west-2.amazonaws.com/beta/rid?query=firstSearch&first_name=Josh',
        tableOutput : false, loading : false};
        this.SelecthandleChange = this.SelecthandleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.SelecthandleChange = this.SelecthandleChange.bind(this);
        this.apiCall = this.apiCall.bind(this);
    this.options = [
        {value: 'Run', label: 'Run'},
        {value: 'Tri', label: 'Triathlon'},
        {value: 'Ski', label: 'Ski'}
    ];
    }


    // handler functions
    SelecthandleChange(event){
        this.setState({selectedValue : event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({first_name : this.state.input.split(" ")[0]}, () => this.handleSubmit2());
        console.log(this.state.first_name);
    };
    handleSubmit2(){
        this.setState({last_name : this.state.input.split(" ")[1]}, () => this.handleSubmit3());
        console.log(this.state.last_name);
    };

    handleSubmit3(){
        this.setState({link2 : this.state.apiFirstLast + "first_name=" + this.state.first_name + "&last_name=" + this.state.last_name,
         link1: this.state.apiFirst + "first_name=" + this.state.first_name}, () => this.apiCall())
    };

    apiCall(){
        this.setState({loading : false});
        this.setState({tableOutput : true});
        if(this.state.last_name && this.state.first_name){
        try{
            fetch(this.state.link2,
                {headers:{
                    "accepts":"application/json",
                }
            }).then(response => response.json())
            .then(json => this.setState({ data : json}))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({loading : true})
            })
        } catch(err) {
            console.log(err);
        }
        if (Object.keys(this.state.data).length === 0)
        {
            this.setState({tableOutput : false})
        }
        else
        {
            this.setState({tableOutput : true})
        }
        this.setState({first_name : "empty"});
        this.setState({last_name: "empty"});
    }
    else if(this.state.first_name && !this.state.last_name){
        try{
            fetch(this.state.link1,
                {headers:{
                    "accepts":"application/json",
                }
            }).then(response => response.json())
            .then(json => this.setState({ data : json}))
            .catch((error) => {
                console.log(error);
            })
                        .finally(() => {
                this.setState({loading : true})
            })
        } catch(err) {
            console.log(err);
        }
        if (Object.keys(this.state.data).length === 0)
        {
            this.setState({tableOutput : false})
        }
        else
        {
            this.setState({tableOutput : true})
        }
        this.setState({first_name : "empty"});
        this.setState({last_name: "empty"});
    }
    else{
        this.setState({loading : true});
    }
}
//min-h-screen
  render(){
  return (
<div class="py-8 bg-blue-300 justify-center items-center" style={{minHeight: "100vh", flex: 0}} >
    <div class="py-20 container mx-auto bg-blue-500 rounded-lg p-14">
        <form>
            <h1 class="text-center font-bold text-white text-4xl">Find your race results</h1>
                <p class="mx-auto font-normal text-sm my-6 max-w-lg">Enter your first and last name
                (choose between running race or ski race)</p>
                <div class="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                    <input class="text-base text-gray-400 flex-grow outline-none px-2 " type="text"
                     placeholder="First and Last Name"
                     value = {this.state.input}
                     onChange= {(e) => this.setState({input : e.target.value})}
                         />
                    <div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                    <select id="Run" class="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                    value={this.state.selectedValue}
                    onChange={e => this.SelecthandleChange(e)}
                    >
                    <option value='Run'>Run</option>
                    <option value='Ski'>Ski</option>
                    </select>
                        <button class="bg-blue-600 text-white text-base rounded-lg px-4 py-2 font-thin"
                        onClick={this.handleSubmit} >
                        Search</button>
                    </div>
                </div>
        </form>

    </div>
{this.state.tableOutput && (this.state.loading ? (<div><SearchTable data={ this.state.data}/>  </div>
            ) : ( <div class="text-2xl justify-center items-center text-center mt-10">Loading...</div>
            ))}
</div>



  );
}
};


export default SearchBar;
