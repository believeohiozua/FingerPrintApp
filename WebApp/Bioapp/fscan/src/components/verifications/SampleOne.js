import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class SampleOne extends Component {

    render() {
        const { getSampleOne } = this.props
        return (
            <div>
                {getSampleOne !== undefined ? getSampleOne.map((sampleItem, index = 0) =>
                    <center className="shadow p-2">
                        <div>
                            <p className="signal1 text-left text-success h6">High</p>
                            <img src={sampleItem.passport} alt={sampleItem.first_name} className="img-thumbnail img-responsive rounded-circle" height="150" width="150" />
                        </div>
                        <div className="h4 font-weight-bold text-info">
                            <Link maintainScrollPosition={false}
                                to={`/bio/${sampleItem.pk}`}>
                                {sampleItem.first_name} {sampleItem.last_name}
                            </Link>
                        </div>
                    </center>)
                    : <p className="text-center font-weight-bold">This Data is Not Avalible</p>
                }
            </div>
        );
    }
}

export default SampleOne;