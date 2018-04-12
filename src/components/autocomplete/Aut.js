import React from 'react';
import './style.css';
import hoc from './hoc';
import hoc2 from './hoc2';
import db from './db';
import Chart from '../chart/Chart';

 class Aut extends React.Component{
     constructor(props){
         super(props);
       this.state={open:false,
       itemContainerBox: {},
      v:[]}
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
     getItemsContainerBox = () => {
        if (!this.inp|| !this.itemsContainerElement) {
          return;
        }
        const rootElementBoundery = this.inp.getBoundingClientRect();
        const itemsContainerElementBoundery = this.itemsContainerElement.getBoundingClientRect();
        const left = rootElementBoundery.left;
        const bottom =
          rootElementBoundery.top + this.itemsContainerElement.offsetHeight;
        const top =
          bottom > window.innerHeight
            ? rootElementBoundery.bottom - this.itemsContainerElement.offsetHeight
            : rootElementBoundery.top;
        return {
          width: `${this.inp.offsetWidth}px`,
          left: `${left}px`,
          top: `${top}px`,
        };
      };
    
      setItemsConteinerBox = () => {
        const itemContainerBox = this.getItemsContainerBox();
        this.setState({
          itemContainerBox,
        });
      };
     renderItems=(val)=>{
        const {v}=this.state;
        //this.props.getItems(val).then(function(items){items.forEach(item=>v.push(item))});
         
      //  console.log(v);
       
        return (
             <div className="good"
              style={this.state.itemContainerBox} ref={itemsContainer => {
            this.itemsContainerElement = itemsContainer;
          }}> 
            { v.map(item=>
              { return  (<p className="notBad" onClick={this.props.onChang} 
              children={item}/> )}
            )  }
             </div>
         )
         this.setState({open:false})
     }
     getActiveCur=(val)=>{
       return this.props.getItems(val).then(data=>{
      this.setState({v:data});
       })
     }
    async componentWillReceiveProps(nextProps){
        if(nextProps.value!==this.props.value && nextProps.value!=="" && 
         nextProps.value.length!=3){
             this.setItemsConteinerBox();
            this.setState({open:true});
       await this.getActiveCur(nextProps.value);
             }
          this.backDropClick(); 
         }
             
       
    
      render(){
         const {open}=this.state;
    return(
        <div>
        <input 
        ref={this.handleInp}
        value={this.props.value}
       // onKeyPress={this.help}
        onChange={this.props.onChange}
        id="autocomplete" type="text"  />
        {this.state.open&&this.renderItems()}
        {<div id="autocomplete_result" 
        ref={this.handleRef}
        styles="display: none;"
        onClick={this.hide}></div>}
        <Chart value={this.props.value}/>
        </div>
      
    );}
}
export default hoc2(hoc(Aut));


