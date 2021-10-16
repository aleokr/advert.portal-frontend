import '../css/form.css'
import React from "react";
import NavBar from "../navigation/navBar.component"
import { RouteComponentProps, withRouter } from 'react-router-dom';
import "../css/advertDetails.component.css"
import advertOwnerImage from "../assets/company.png"
import i18n from "../messages/i18n"


type State = {
    advertId: number;
    advertTitle: string;
    advertDescription: string;
    advertCreatedAt: string;
    advertType: string;
    ownerId: number;
    ownerName: string;
    ownerType: string;
    canApplicate: boolean;
    canEdit: boolean;
    editMode: boolean;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    advertId: 0,
    advertTitle: '',
    advertDescription: '',
    advertCreatedAt: '',
    advertType: '',
    ownerName: '',
    ownerId: 0,
    ownerType: '',
    canApplicate: false,
    canEdit: false,
    editMode: false,
    errorMessage: '',
    success: false
}
class AdvertDetailsView extends React.Component<RouteComponentProps>{

    state = initialState;
    componentDidMount() {
        this.setId(this.props.match.params);
    }

    setId = (params: any) => {
        this.state.advertId = params.id;
    };

    render() {
        return (

            <React.Fragment>
                <NavBar />

                <body className="advert-details-body">
                    <div className="advert-detail-data" >
                        <div className="advert-detail-title">{i18n.t('advertDetail.advertDetailPageTitle')}</div>

                        <div className="application-advert">
                            {this.state.canApplicate && <button className="detail-button" >{i18n.t('advertDetail.applicate')}</button>}
                            {this.state.canEdit && <button className="detail-button" >{i18n.t('advertDetail.edit')}</button>}

                        </div>
                        <div className="advert-data">
                            <div className="basic-data">
                                {!this.state.editMode &&

                                    <div>
                                        <div className="detail-name-label">{i18n.t('advertDetail.advertDataTitle')}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.title')}</label>
                                        <div className="detail-input">{this.state.advertTitle}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.description')}</label>
                                        <div className="detail-input">{this.state.advertDescription}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.createdAt')}</label>
                                        <div className="detail-input">{this.state.advertCreatedAt}</div>
                                    </div>
                                }
                                {this.state.editMode &&
                                    <div>
                                        <label className="detail-label" >{i18n.t('advertDetail.title')}</label>
                                        <input className="detail-input-edit" type="text" defaultValue={this.state.advertTitle} />
                                        <label className="detail-label">{i18n.t('advertDetail.description')}</label>
                                        <textarea rows={10} className="user-input-edit" defaultValue={this.state.advertDescription} />
                                        <label className="detail-label">{i18n.t('advertDetail.createdAt')}</label>
                                        <div className="detail-input">{this.state.advertCreatedAt}</div>
                                    </div>
                                }

                            </div>

                            <div className="owner-data">
                                <div className="detail-name-label">{i18n.t('advertDetail.ownerDataTitle')}</div>
                                <img src={advertOwnerImage} className="owner-image" alt="Owner Image" />
                                <label className="detail-label">{i18n.t('advertDetail.ownerName')}</label>
                                <div className="detail-input">{this.state.ownerName}</div>
                            </div>
                        </div>
                    </div>

                </body>
            </React.Fragment >
        );
    }


}

export default withRouter(AdvertDetailsView)