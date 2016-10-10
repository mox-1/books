import React, { Component, PropTypes } from 'react';
import {SelectField, MenuItem, RaisedButton} from 'material-ui';

import {Categories, Values} from './constants/CategoryConstants';
import './FilterPanel.css';

class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
            value: null
        }
    }
    _changeCategoryHandler = (e, i, v) => {
        this.setState({
            category: v
        })
    }
    _changeValueHandler = (e, i, v) => {
        this.setState({
            value: v
        })
    }
    _handleSubmit = () => {
        if (this.state.category && this.state.value) {
            let data = {};
            data[this.state.category] = this.state.value;
            this.props.addFilter(data);
        }
    }
    render() {
        let existingFilterKeys = [];
        this.props.existingFilters.forEach(f => {
            existingFilterKeys = [...existingFilterKeys, ...Object.keys(f)]
        });
        let category = this.state.category && Values[this.state.category];
        return (
            <div>
                <h3 className='filter-header'>Select filter</h3>
                <SelectField value={this.state.category} onChange={this._changeCategoryHandler}>
                    {Object.keys(Categories).map((k, i) => (
                        <MenuItem key={i} value={Categories[k].key} primaryText={Categories[k].label} disabled={!!~existingFilterKeys.indexOf(Categories[k].key)}/>
                    ))}
                </SelectField>
                <SelectField value={this.state.value} onChange={this._changeValueHandler}>
                    {category && Object.keys(category).map((k, i) => (
                        <MenuItem key={i} value={category[k].key} primaryText={category[k].label}/>
                    ))}
                </SelectField>
                <RaisedButton
                    label="Add filter"
                    disabled={!this.state.value}
                    className={'filter-button'}
                    onClick={this._handleSubmit}
                />
            </div>
        )
    }
}

FilterPanel.propTypes = {
    addFilter: PropTypes.func.isRequired,
    existingFilters: PropTypes.array.isRequired
}

export default FilterPanel;
