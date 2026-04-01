/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

import { connect } from "react-redux";
import NavBar from "./NavBar";
import { getDepartments } from "../../redux/actions/DepartmentAction";
import { getCartByUserId, postCart } from "../../redux/actions/cartAction";
const mapStoreToProps = state => ({
  departments: state.department.departments,
  cart: state.cart.cart
});

const mapDispatchToProps = dispatch => ({
  getDepartments: () => dispatch(getDepartments()),
  getCartByUserId: () => dispatch(getCartByUserId()),
  postCart: (pid, inc, dec, rm) => dispatch(postCart(pid, inc, dec, rm))
});

export default connect(mapStoreToProps, mapDispatchToProps)(NavBar);
