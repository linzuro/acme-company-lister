
const {Component} = React
const {render} = ReactDOM

const Header=({addNewNumber})=>{
    return React.createElement('button',{onClick:addNewNumber},"Add New Number")
}
const List=({data,removeNumber})=>{
    //console.log(props)
    const lis = data.map((item,idx)=>{
        return React.createElement('li',{key:idx,className:'item',onClick:removeNumber},item)
    });
    //console.log(lis)
    return React.createElement('ul',null,lis)
}
class App extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.setState({data:[1,2,5,7]});
    }
    render(){
        const {data} = this.state;
        const addNewNumber=()=>{
            this.setState({data:[...data,Math.random()]})
        }
        const removeNumber=(idx)=>{
            console.log(idx)
            //data.splice(idx,1);
            this.setState({data})
        }
        const list = React.createElement(List,{data,removeNumber})
        const list2 = React.createElement(List,{data,removeNumber})
        const header = React.createElement(Header,{addNewNumber})
        return React.createElement('div',null,header,list,list2)
    }
}
const root = document.querySelector("#root");
render(React.createElement(App),root);