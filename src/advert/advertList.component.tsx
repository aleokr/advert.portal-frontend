import i18n from "../messages/i18n";
import '../css/advertList.component.css'
import '../css/pagination.css'
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ReactPaginate from "react-paginate";
type AdvertType = {
    id: number;
    title: string;
    shortDescription: string;
    advertCategory: string;
    createdAt: string;
    addedBy: string;
}

type CompaniesData = {
    id: number;
    name: string;
}

type CategoryType = {
    name: string;
}

type State = {
    companyAdverts: AdvertType[];
    individualAdverts: AdvertType[];
    companyPageNumber: number;
    companyPagesCount: number;
    individualPageNumber: number;
    individualPagesCount: number;
    categories: CategoryType[];
    companies: CompaniesData[];
    similarFiles: boolean;
    searchText: string;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    companyAdverts: [],
    individualAdverts: [],
    companyPageNumber: 0,
    companyPagesCount: 0,
    individualPageNumber: 0,
    individualPagesCount: 0,
    categories: [],
    companies: [],
    similarFiles: false,
    searchText: '',
    errorMessage: '',
    success: false
}
type Action = { type: 'setIndividaulPageNumber', payload: number }
    | { type: 'setCompanyPageNumber', payload: number }
    | { type: 'registerSuccess', payload: string }
    | { type: 'registerFailed', payload: string }
    | { type: 'setError', payload: string }
    | { type: 'setSearchText', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setIndividaulPageNumber':
            return {
                ...state,
                individualPageNumber: action.payload
            };
        case 'setCompanyPageNumber':
            return {
                ...state,
                companyPageNumber: action.payload
            };
        case 'registerSuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'registerFailed':
            return {
                ...state,
                success: false,
                errorMessage: action.payload
            };
        case 'setError':
            return {
                ...state,
                errorMessage: action.payload
            };
        case 'setSearchText':
            return {
                ...state,
                searchText: action.payload
            };
    }
}
class AdvertListView extends React.Component<RouteComponentProps> {


    state = initialState;

    /* istanbul ignore next */
    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/companies/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ companies: data });
            });

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/categories')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            });
        this.loadCompanyAdverts();
    }

    /* istanbul ignore next */
    loadIndividualAdverts() {
        let params: string = '&limit=10&type=INDIVIDUAL';
        if (this.state.similarFiles) {
            params = params + '&similarFiles=true';
        }
        if (this.state.searchText !== '') {
            params = params + '&searchText=' + this.state.searchText;
        }
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/getAdverts?offset=' + 10 * this.state.individualPageNumber + params, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    individualAdverts: data.adverts,
                    individualPageNumber: data.paging !== undefined ? data.paging.page : 0,
                    individualPagesCount: data.paging !== undefined ? data.paging.pagesCount : 0
                });
            });
    }

    /* istanbul ignore next */
    loadCompanyAdverts() {
        let params: string = '&limit=10&type=COMPANY';

        if (this.state.similarFiles) {
            params = params + '&similarFiles=true';
        }
        if (this.state.searchText !== '') {
            params = params + '&searchText=' + this.state.searchText;
        }
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/getAdverts?offset=' + 10 * this.state.companyPageNumber + params, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data !== null) {
                    this.setState({
                        companyAdverts: data.adverts,
                        companyPageNumber: data.paging !== undefined ? data.paging.page : 0,
                        companyPagesCount: data.paging !== undefined ? data.paging.pagesCount : 0
                    });
                }
            });
    }

    details = (id: number) => {
        this.props.history.push('/details/' + id);
    };

    handleCompanyPageChange = (e: any) => {
        this.setState({
            companyPageNumber: e.selected,
        }, () => {
            this.loadCompanyAdverts();
        });
    };

    handleIndividualPageChange = (e: any) => {
        this.setState({
            individualPageNumber: e.selected,
        }, () => {
            this.loadIndividualAdverts();
        });
    };

    handleChangeSimiliarFiles = (e: any) => {
        let currentValue: boolean = this.state.similarFiles;
        this.setState({
            similarFiles: !currentValue,
        }, () => {
            this.loadIndividualAdverts();
            this.loadCompanyAdverts();
        });

    }

    handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchText: e.target.value,
        }, () => {
            this.loadIndividualAdverts();
            this.loadCompanyAdverts();
        });
    }

    render() {
        return (
            <div className="list-body">
                <div className="tabs">
                    <div className="tab-2">
                        <label className="list-label" htmlFor="tab2-1">{i18n.t('advertList.firstTabName')}</label>
                        <input id="tab2-1" name="tabs-two" type="radio" onChange={this.loadCompanyAdverts.bind(this)} defaultChecked />
                        <div>
                            <div>
                                <label className="search-label">{i18n.t('advertList.serachByText')}</label>
                                <input className="search-input" value={this.state.searchText} onChange={this.handleChangeSearchText.bind(this)} />
                            </div>
                            <div>
                                <label className="search-label">{i18n.t('advertList.searchBySimiliarity')}</label>
                                <div className="check">
                                    <input id="check" type="checkbox" onClick={this.handleChangeSimiliarFiles.bind(this)} checked={this.state.similarFiles} />
                                    <label htmlFor="check"></label>
                                </div></div>
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col col-1">{i18n.t('advertList.name')}</div>
                                    <div className="col col-2">{i18n.t('advertList.shortDescription')}</div>
                                    <div className="col col-3">{i18n.t('advertList.addedBy')}</div>
                                    <div className="col col-4">{i18n.t('advertList.createdAt')}</div>
                                    <div className="col col-5">{i18n.t('advertList.category')}</div>
                                    <div></div>
                                </li>

                                {this.state.companyAdverts !== undefined && this.state.companyAdverts.map(advert => (
                                    <li className="table-row" onClick={() => this.details(advert.id)} >
                                        <div className="col col-1">{advert.title}</div>
                                        <div className="col col-2">{advert.shortDescription}</div>
                                        <div className="col col-3">{advert.addedBy}</div>
                                        <div className="col col-4">{advert.createdAt}</div>
                                        <div className="col col-5">{i18n.t('categories.' + advert.advertCategory)}</div>
                                    </li>
                                ))}
                            </ul>
                            {this.state.companyPagesCount > 1 &&
                                <ReactPaginate
                                    previousLabel={i18n.t('pagination.previous')}
                                    nextLabel={i18n.t('pagination.next')}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.companyPagesCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handleCompanyPageChange}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"} />
                            }
                        </div>
                    </div>
                    <div className="tab-2">
                        <label className="list-label" htmlFor="tab2-2">{i18n.t('advertList.secondTabName')}</label>
                        <input id="tab2-2" name="tabs-two" type="radio" onChange={this.loadIndividualAdverts.bind(this)} />
                        <div>
                            <div>
                                <label className="search-label">{i18n.t('advertList.serachByText')}</label>
                                <input className="search-input" onChange={this.handleChangeSearchText.bind(this)} value={this.state.searchText} />
                            </div>
                            <div>
                                <label className="search-label">{i18n.t('advertList.searchBySimiliarity')}</label>
                                <div className="check">
                                    <input id="check" type="checkbox" onClick={this.handleChangeSimiliarFiles.bind(this)} checked={this.state.similarFiles} />
                                    <label htmlFor="check"></label>
                                </div></div>
                            <ul className="responsive-table">
                                <li className="table-header">
                                    <div className="col col-1">{i18n.t('advertList.name')}</div>
                                    <div className="col col-2">{i18n.t('advertList.shortDescription')}</div>
                                    <div className="col col-3">{i18n.t('advertList.addedBy')}</div>
                                    <div className="col col-4">{i18n.t('advertList.createdAt')}</div>
                                    <div className="col col-5">{i18n.t('advertList.category')}</div>
                                </li>

                                {this.state.companyAdverts !== undefined && this.state.individualAdverts.map(advert => (
                                    <li className="table-row" onClick={() => this.details(advert.id)}>
                                        <div className="col col-1">{advert.title}</div>
                                        <div className="col col-2">{advert.shortDescription}</div>
                                        <div className="col col-3">{advert.addedBy}</div>
                                        <div className="col col-4">{advert.createdAt}</div>
                                        <div className="col col-5">{i18n.t('categories.' + advert.advertCategory)}</div>
                                    </li>
                                ))}
                            </ul>
                            {this.state.individualPagesCount > 1 &&
                                <ReactPaginate
                                    previousLabel={i18n.t('pagination.previous')}
                                    nextLabel={i18n.t('pagination.next')}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.individualPagesCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handleIndividualPageChange}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { initialState, reducer };
export default AdvertListView;
