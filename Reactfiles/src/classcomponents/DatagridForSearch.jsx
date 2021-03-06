import React, { Component } from 'react';
class DatagridForSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let columns =[];
        for(let c in this.props.dataSource[0]){
            columns.push(c);
        }
        let data2 = [];
        let columns2=[];
        let data1 = this.props.dataSource;
        
        if(this.props.dataSource[1] === 404)    {
            columns2 = columns;
            columns = [];
            data1=[]
            data2 = ['Record Not Found']
        }

        return ( 
        <div className="container">
          <table className="table table-bordered table-striped">
             <thead>
               <tr>
                  {
                      columns.map((c,i) => (
                          <th key={i}>{c}</th>
                      ))
                  }
                  {
                      columns2.map((c,i) => (
                        <th key={i}>{c}</th>
                    ))
                  }
               </tr>
             </thead>
             <tbody>
               {
                   data1.map((d,j) => (
                       <tr key={j}>
                         {
                            columns.map((c,i) => (
                                <td key={i}>{d[c]}</td>
                            )) 
                            
                        }
                       </tr>
                   ))
               }
               {
                    data2.map((d,i) => (
                        <td colSpan="5"><center>{d}</center></td>
                    ))
               }
             </tbody>
          </table>
        </div>
        );
    }
}
 
export default DatagridForSearch;