import { Component } from "react";
import { connect } from "./my-react-redux";
import bindActionCreators from "./my-redux/bindActionCreators";
//connect 高阶组件:是一个函数，接受组件作为参数，返回新的组件
//两个参数 mapStateToProps mapDispatchToProps
export default connect(
  (state, ownProps) => {
    // console.log(ownProps); //性能问题
    return state;
  },
  //mapDispatchToProps:object|function
  //object
  {
    add: () => ({ type: "ADD" }),
    minus: () => ({ type: "MINUS" }),
  }
  //function
  // (dispatch) => {
  //   let creators = {
  //     add: () => ({ type: "ADD" }),
  //     minus: () => ({ type: "MINUS" }),
  //   };
  //   creators = bindActionCreators(creators, dispatch);
  //   return { dispatch, ...creators };
  // }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props);
      const { count, dispatch, add, minus } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <button onClick={() => dispatch({ type: "ADD" })}>{count}</button>
          <button onClick={add}>{count}</button>
          <button onClick={minus}>{count}</button>
        </div>
      );
    }
  }
);
