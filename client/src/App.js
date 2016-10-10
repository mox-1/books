// Packages
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Popover, IconButton } from 'material-ui';

// Components
import Wheel from './Wheel';
import FilterPanel from './FilterPanel';

// Styles
import './styles/App.css';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [],
            filterPanelOpen: false,
            anchorEl: null
        }
    }

    _addFilter = (filter) => {
        this.setState({
            filters: [...this.state.filters, filter],
            filterPanelOpen: false
        });
    }

    _openFilterPanel = (event) => {
        event.preventDefault();
        this.setState({
            filterPanelOpen: true,
            anchorEl: event.currentTarget,
        });
    }

    _closeFilterPanel = () => {
        this.setState({
            filterPanelOpen: false,
        });
    }

    _remove = () => {
        var filters = this.state.filters.slice();
        filters.pop();
        this.setState({
            filters: filters
        });
    }

    render() {
        return (
            <div className="app">
                <MuiThemeProvider>
                    <div>
                        <div className='body-header-wrapper'>
                            <h1 className='header'>Browse books</h1>
                            <div className={'add-filter-wrapper'}>
                                <IconButton onTouchTap={this._openFilterPanel} tooltip="Add filter">
                                    <div className='add-filter'></div>
                                </IconButton>
                            </div>
                        </div>
                        <div className="page-wrapper">
                            <Popover
                                open={this.state.filterPanelOpen}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                onRequestClose={this._closeFilterPanel}
                            >
                                <div className='filter-panel'>
                                    <FilterPanel addFilter={this._addFilter} existingFilters={this.state.filters}/>
                                </div>
                            </Popover>
                            <Wheel active={false} filters={[]}/>
                            {this.state.filters.map((f, i) => (
                                <Wheel
                                    remove={this._remove}
                                    filters={this.state.filters.slice(0, i + 1)}
                                    active={i === this.state.filters.length - 1 ? true : false}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
