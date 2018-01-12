import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import axios from "axios";


class TablePage extends Component {

  constructor(props){
    super(props)
    console.log('TablePage', this);
    var search = this.props.location.search;
    this.state = {
      data: null,
      error: false,
      current: search ? parseInt(search.slice(6), 10) : 1
    }
  }

  componentDidMount(){
    console.log('componentDidMount', this);
    this.fetchData();
  }


  componentDidUpdate(prevPrpos){
    console.log('componentDidUpdate', this.props.match, prevPrpos.match, this.props)
    const search = this.props.location.search;
    if(search !== prevPrpos.location.search){
      //不同page
      let page =  search  ?  parseInt(search.slice(6), 10) : 1;
      this.setState({
        current: page
      })
      this.fetchData(page)
    }
    
  }

  fetchData( page ){
    const { match, location } = this.props;
    var tab = 'good';
    // var page = location;
    console.log('fetchData', match, location);


    this.setState({
      ajax: true
    })

    axios.get('http://cnodejs.org/api/v1/topics/', {
      params: {
        limit: 10,
        tab,
        page: page ? page :  this.state.current

      }
    }).then((response)=>{
      if(!response.data.success){
        this.setState({
          error: true,
          ajax: false
        });
        return false;
      }

      this.setState({
        data: response.data.data,
        ajax: false
      });

    }).catch((error)=>{
      console.log(error);
      this.setState({
        error: true,
        ajax: false
      });
    })
  }

  pagerChange(current){
    const { history, match} = this.props;
    console.log(current);
    if(current){
      history.push({
        pathname: match.url,
        search: `?page=${current}`
      })
    }
    this.setState({
      current: current
    })
    
  }

  render(){
    let match = this.props.match;
    let columnRender = columns(match.url);

    return (
      <div style={{width: 1200, margin: '50px auto'}}>
        <Table bordered pagination={{
          current: this.state.current,
          total: 100,
          onChange: e => this.pagerChange(e)
        }} loading={this.state.ajax} 
        columns={columnRender} 
        dataSource={this.state.data}
        rowKey={record => record.id}
      />
     </div>
    )
  }
}


const columns = (baseUrl)=>{
  return [{
    title: '标题',
    dataIndex: 'title',
    render: (text, record) => <Link to={`${baseUrl}/${record.id}`}>{text}</Link>,
  }, {
    title: '作者',
    dataIndex: 'author.loginname',
  }];
}


export default TablePage;