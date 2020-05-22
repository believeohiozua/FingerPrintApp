import Search from 'react-search'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class SearchBar extends Component {

    HiItems(items) {
        var get_id = items[0]
        if (get_id !== undefined) {
            var item_pk = get_id.id
            localStorage.setItem('item_pk', item_pk);
        };
        {
            items.length > 0 ? items.map((searchedItem) => {
                return (
                    document.getElementById('searched_val').innerHTML = searchedItem.id + ": " + searchedItem.value
                )
            }) : null
        };
    }

    render() {
        const thelink = localStorage.getItem('item_pk')
        const { search_query } = this.props
        let dtnr = Object.assign(search_query.map((x) => ({ ['id']: x.pk, ['value']: x.first_name + " " + x.last_name })))
        return (
            <div>
                {/* <Search items={dtnr} /> */}
                <Search items={dtnr}
                    className='form-control'
                    placeholder='Search list'
                    maxSelected={3}
                    multiple={false}
                    onItemsChanged={this.HiItems.bind(this)} />
                <center>
                    <Link maintainScrollPosition={false}
                        to={{
                            pathname: `/detail/${thelink}`,
                            state: { fromDashboard: false }

                        }}>
                        <span className="color-link">
                            <p id="searched_val"></p>
                        </span>
                    </Link>
                </center>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    search_query: state.regdata_reducer.search_query,
});
export default connect(mapStateToProps, null)(SearchBar);
