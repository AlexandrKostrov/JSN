import React from 'react';

export default function hoc2(Component){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state={
                value:"",
                v:[],
            }
        }
       
        handleChange=event=>{
            this.setState({
                value:event.target.innerHTML,
            })
        }
        onChange=(event)=>{
            this.setState({
                value:event.target.value,
            })
        }
        render(){
            return(
                <Component {...this.props}
                onChange={this.onChange}
                onChang={this.handleChange}
                value={this.state.value}
                v={this.state.v}/>
            )
        }
    }
}