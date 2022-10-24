import Pagination from "./Pagination";
import React from "react";
import ReactPaginate from "react-paginate";
import SelectField from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Divider from '@material-ui/core/Divider';
const styles = {
  paginationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: ".5em",
    fontSize: ".75em"
  },
  paginationSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paginationText: {
    margin: "0 1.25em"
  },
  paginationSelect: {
    width: 50,
    fontSize: "1em"
  },
  navigationLeft: {
    marginRight: ".5em",
    cursor: "pointer"
  },
  navigationLeftFirstPage: {
    marginRight: ".5em",
    color: "rgba(0,0,0,0.26)"
  },
  navigationRight: {
    margin: "0 .5em",
    cursor: "pointer"
  },
  navigationRightLastPage: {
    margin: "0 .5em",
    color: "rgba(0,0,0,0.26)"
  }
};
export default class PaginationTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rowsPerPage: [5, 10, 15, 20],
      rows: this.props.rows,
      numberOfRows: 5,
      page: 1,
      total: 0
    };
  }

  componentWillMount() {
    const updatedState = Object.assign({}, this.state);
    updatedState.rows = this.props.rows;
    this.calculateRows(updatedState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }
  selectPageNumber = e => {
    const updatedState = Object.assign({}, this.state);
    updatedState.page = e.selected + 1;
    this.calculateRows(updatedState);
  };
  renderRowsPerPage() {
    return this.state.rowsPerPage.map((rowValue, index) => {
      return <MenuItem key={index} value={rowValue} primaryText={rowValue} />;
    });
  }
  selectRowsPerPage = e => {
    const updatedState = Object.assign({}, this.state);
    updatedState.numberOfRows = parseInt(e.target.innerText, 10);
    if (updatedState.numberOfRows * this.state.page > this.state.total) {
      let updatedPage = Math.ceil(
        this.state.total / updatedState.numberOfRows,
        10
      );
      updatedState.page = updatedPage;
      this.calculateRows(updatedState);
    } else {
      this.calculateRows(updatedState);
    }
  };
  calculateRows = updatedStateDefault => {
    const updatedState = Object.assign({}, updatedStateDefault);
    let rows = this.props.rows;
    let searchRange = rows.slice(
      updatedState.numberOfRows * updatedState.page - updatedState.numberOfRows,
      updatedState.numberOfRows * updatedState.page
    );

    updatedState.rows = searchRange;
    updatedState.total = rows.length;
    updatedState.numberOfRows = updatedState.numberOfRows;
    this.setState(updatedState, () => {
      return this.props.calculateRows(searchRange);
    });
  };
  render() {
    return (
      <div>
        <Divider />
        <div style={styles.paginationSection}>
          <div style={styles.paginationText}>Rows Per Page</div>
          <SelectField
            style={styles.paginationSelect}
            value={this.state.numberOfRows}
            onChange={this.selectRowsPerPage}
          >
            {this.renderRowsPerPage()}
          </SelectField>
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={this.state.total / this.state.numberOfRows}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={this.selectPageNumber}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
