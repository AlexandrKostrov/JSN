import React from 'react';
import './style.css';
import db from '../autocomplete/db';
 

export default class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            p1:170,
            p2:60,
            p3:80,
            p4:20,
            p5:80,
            p6:50,
            p7:60,
            curcurr:[],
            price:null,
        }
    }

        componentWillReceiveProps(nextProps){
            const {curcurr}=this.state;
            if(db.includes(nextProps.value)){
                let curcurr1=[...this.state.curcurr, nextProps.value];
                
                curcurr1=curcurr1.filter(el=>{
                   return el===nextProps.value;
                });
                console.log(curcurr1);
               // console.log(curcurr);
                this.setState({curcurr:curcurr1});  }
                
            if(nextProps.value!==this.props.value &&
               // this.props.value.length===3 &&
               db.includes(nextProps.value) &&
               this.state.curcurr.length>0){
                const ws=new WebSocket('ws://coins-stream.demo.javascript.ninja'); 
                ws.addEventListener('open',function(){
                    console.log(curcurr[0]);
                ws.send(JSON.stringify({  type: 'unsubscribe', currency: curcurr[0]  }));
            })
            } 
        }
        shouldComponentUpdate({value}){
            if(db.includes(value)){
                return true;
            }else{return false}
        }
        componentWillUpdate({value}){
            const ws=new WebSocket('ws://coins-stream.demo.javascript.ninja');
            const t=this;
            ws.addEventListener('open',function(){ 
                console.log('OK Connected');
                const curr=value;
                ws.send(JSON.stringify({type: 'subscribe', currency: curr  }));
                ws.addEventListener('message',function(event){
                    
                    const res=JSON.parse(event.data);
                    
                });
               ws.addEventListener('close',function(event){
                   console.log('Good Bye')
    });
            });
        }
       
  
    render(){
        const {p1,p2,p3,p4,p5,p6,p7}=this.state;
        const curr=db.includes(this.props.value)?`USD - ${this.props.value}`:'';
        return(
            <div>
            <svg viewBox="0 0 500 100" className="chart">
            <g>
            <text className="curr" x="15" y="-20">{curr}</text>
            </g>
            <polyline
            fill="none"
            stroke="#0074d9"
            strokeWidth="3"
            points={` 0,${p1} 60,${p2} 140,${p3} 260,${p4} 380,${p5} 420,${p6} 500,${p7}`}/>
            </svg>
            </div>
        );
    }
}

 