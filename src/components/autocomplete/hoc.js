import React from 'react';
import db from './db';

export default function hoc(Component){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state='';
        }
        getItems=text=>{
          return new Promise(function(ok,fail){
           var a =new RegExp(text, "i");
           ok(db.filter(curr=>{return a.test(curr);})) 
           });    
            }
        render(){
            return(
                <Component {...this.props} getItems={this.getItems}/>
            )
        }
    }
}
