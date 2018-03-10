import React from 'react';
import './style.css';
import hoc from './hoc';
import hoc2 from './hoc2';
import db from './db';
import Chart from '../chart/Chart';

 class Aut extends React.Component{
     constructor(props){
         super(props);
       
     }
     handleRef=(node)=>{
         this.div=node;
     }
     handleInp=(node)=>{
         this.inp=node;
     }
     hide=(event)=>{
         this.div.innerHTML="";
         this.div.style={display:'none'}
     }
     backDropClick=()=>{
         const inp=this.inp;
         const div=this.div;
         const hd=this.hide;
        document.addEventListener('click',function(event){
            if(event.target!=div && event.target!=inp && 
            !db.includes(inp.value)){
                hd();
                inp.value='';
            }
        })
     }
     componentWillReceiveProps(nextProps){
        if(nextProps.value!==this.props.value && nextProps.value!=="" && 
         nextProps.value.length!=3){
             this.hide();
             this.props.getItems(nextProps.value).then(items=>items.forEach(item=>{
                const str=document.createElement("p");
                
                str.innerHTML=item;
                str.addEventListener('click',this.props.onChang);
                this.div.style={display:'block'};
                this.div.appendChild(str);
            }))
             }
          this.backDropClick(); 
         }
             
       
    
      render(){
         // console.log(this.props.value);
    return(
        <div>
        <input 
        ref={this.handleInp}
        value={this.props.value}
       // onKeyPress={this.help}
        onChange={this.props.onChange}
        id="autocomplete" type="text"  />
        <div id="autocomplete_result" 
        ref={this.handleRef}
        styles="display: none;"
        onClick={this.hide}></div>
        <Chart value={this.props.value}/>
        </div>
       
    );}
}
export default hoc2(hoc(Aut));


