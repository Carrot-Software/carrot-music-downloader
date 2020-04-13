/**
 * @author xue chen
 * @since 2020/4/12
 */

import React, {Component} from "react";
import {Column, Header, Row, Toast} from "../component";
import "../css/history-page.css";
import {del, get} from "../util/requests";

class HistoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
    this.renderList = this.renderList.bind(this);
    this.getListData = this.getListData.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  componentDidMount() {
    this.getListData();
  }

  render() {
    return (
      <Column
        className="wrapper"
      >
        <Header/>
        <Column
          className="history-page-content"
        >
          <Row
            className="content-border history-page-header"
            justify="space-between"
          >
            <Row
              className="back-container"
              onClick={() => {
                this.props.changeHref("./home")
              }}
            >
              <img src={require('../assets/icon/back.svg')} alt="返回" title="返回首页"/>
              <p>返回</p>
            </Row>
            <p className="title">下载历史</p>
            <Row
              className="delete-container"
              onClick = {this.clearList}
            >
              <p>清空</p>
              <img src={require('../assets/icon/delete.svg')} alt="清空" title="清空历史"/>
            </Row>
          </Row>
          <Column
            className="history-list-container content-border"
            justify="flex-start"
          >
            <Row
              className="content-border header"
              justify="flex-start"
            >
              <p>音乐标题</p>
              <p>歌手</p>
              <p>专辑</p>
            </Row>
            <div className="list-content">
              {this.renderList()}
            </div>
          </Column>
        </Column>
      </Column>
    );
  }

  /**
   * 渲染列表
   * @returns {[]}
   */
  renderList() {
    let arr = [];
    if(this.state.listData.length > 0) {
      this.state.listData.forEach((item, index) => {
        arr.push(
          <Row
            key = {`item${index}`}
            className="content-border list-item"
            justify="flex-start"
          >
            <img
              src={item.success ? require('../assets/icon/download-success.svg') : require('../assets/icon/download-fail.svg')}
              title = {item.success ? "下载成功" : "该歌曲暂不支持下载"}
              alt={item.success ? "下载成功" : "该歌曲暂不支持下载"}
            />
            <p>{item.song.name}</p>
            <p>{item.song.singers.join(" ")}</p>
            <p>{item.song.album}</p>
          </Row>
        )
      })
    }
    return arr;
  }

  /**
   * 获取列表数据
   */
  getListData() {
    get('/api/history')
      .then(res => {
        if(res.code === 200) {
          this.setState(() => (
            {
              listData: res.data
            }
            ))
        }
      })
  }

  /**
   * 清楚列表
   */
  clearList() {
    del('/api/history')
      .then(res => {
        if(res.code === 200) {
          this.setState({
            listData: []
          });
          Toast.info("清除成功")
        }
      })
  }

}



export default HistoryPage;