import React, {FC, useEffect, useState} from "react";
import {AppState} from "../../app-store/app.reducer";
import {connect} from "react-redux";
import {store} from "../../../index";
import {AppStateKeys} from "../../app.constants";
import {getState} from "../../app-store/app.util";
import {EntityState} from "@reduxjs/toolkit";
import Retry from "../Errors/Retry/Retry";
import {ComponentStatus, DataStatus} from "./store/status.reducer";
import {SyncOutlined} from "@ant-design/icons";


export interface ComponentInfo {
    componentId: string;
    callback?: (T: any) => void;
    callbackArgs?: any;
}

export interface StatusComponentProps {
    children: React.ReactNode;
    statusStateKeys: string[];
    componentInfos?: ComponentInfo[];
    isShowRetry?: boolean;
    isShowErrorMessage?: boolean;
    isShowErrorId?: boolean;
    showOverlay?: boolean;
    notchLoader?: boolean;
    retryErrorClass?: string;
    overlayClass?: string;
    onContentVisible?: () => any;
}

const Status: FC<StatusComponentProps> = ({
                                              statusStateKeys = AppStateKeys.STATUS,
                                              componentInfos = [],
                                              isShowRetry = true,
                                              isShowErrorId = false,
                                              isShowErrorMessage = false,
                                              showOverlay = false,
                                              notchLoader = false,
                                              retryErrorClass = '',
                                              children,
                                              overlayClass = '',
                                              onContentVisible
                                          }) => {

    const [primaryComponentInfo, setPrimaryComponentInfo] = useState<any>(null);
    const [componentStatus, setComponentStatus] = useState<any>();

    const setPrimaryComponent = () => {
        setPrimaryComponentInfo(componentInfos[0]);
        if (componentStatus != null && primaryComponentInfo != null) {
            for (const componentInfo of componentInfos) {
                const componentId = componentInfo.componentId;
                if (componentStatus[componentId] && componentStatus[componentId].status
                    && componentStatus[componentId].status.status === DataStatus.ErrorState) {
                    setPrimaryComponentInfo(componentInfo);
                    break;
                } else if (componentStatus[componentId] && componentStatus[componentId].status
                    && componentStatus[componentId].status.status === DataStatus.Loading) {
                    setPrimaryComponentInfo(componentInfo)
                }
            }
            const primaryComponentId = primaryComponentInfo.componentId;
            if (componentStatus[primaryComponentId] && componentStatus[primaryComponentId].status
                && componentStatus[primaryComponentId].status.errorStatus) {
                isShowRetry = isShowRetry && componentStatus[primaryComponentId].status.errorStatus >= 500;
            }
        }
    }

    const shouldContentBeVisible = () => {
        if (primaryComponentInfo != null) {
            const componentId = primaryComponentInfo.componentId;
            const newComponentStatus = componentStatus && componentStatus[componentId];
            const componentDataStatus = newComponentStatus && newComponentStatus.status ? newComponentStatus.status.status : null;
            return (showOverlay && componentDataStatus !== DataStatus.ErrorState)
                || componentDataStatus === DataStatus.Loaded;
        }
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const status = getState<EntityState<ComponentStatus>>(store.getState(), statusStateKeys).entities;
            if (status != null && Object.keys(status).length > 0) {
                setComponentStatus(status);
                setPrimaryComponent();
                if (shouldContentBeVisible() && onContentVisible != undefined) {
                    onContentVisible();
                }
            }
        });
        return () => unsubscribe();
    }, [0]);
    return <>
        {
            primaryComponentInfo && componentStatus && componentStatus[primaryComponentInfo.componentId] && !notchLoader
                ? <>
                    {
                        !showOverlay && componentStatus[primaryComponentInfo.componentId].status.status === DataStatus.Loading
                        && <div className="imgloader">
                            <img src={require('../../../assets/loading.gif')} alt="Loading" title="Loading" height="40"/>
                        </div>
                    }
                    {
                        showOverlay && componentStatus[primaryComponentInfo.componentId].status.status === DataStatus.Loading ?
                            <div className={'update-overlay' + overlayClass}></div> : <></>
                    }
                    {shouldContentBeVisible() ? children : <></>}
                    {componentStatus[primaryComponentInfo?.componentId].status.status === DataStatus.ErrorState
                        ? <Retry isShowRetry={isShowRetry}
                                 errorId={isShowErrorId ? componentStatus[primaryComponentInfo.componentId].status.errorId : null}
                                 detailMessage={isShowErrorMessage ? componentStatus[primaryComponentInfo.componentId].status.errorDetailMessage : ''}
                                 message={isShowErrorMessage ? componentStatus[primaryComponentInfo.componentId].status.errorMsg : ''}
                                 retryRequest={() => primaryComponentInfo.callback(primaryComponentInfo.callbackArgs)}
                                 errorClass={retryErrorClass}></Retry>
                        : <></>
                    }
                </>
                : <>
                    {
                        componentStatus && componentStatus[primaryComponentInfo.componentId].status.status === DataStatus.Loading
                            ? <div className={'preloader'}><span className={'spinner'}><SyncOutlined spin/></span> Loading...</div>
                            : <></>
                    }
                </>
        }
    </>
}

const mapStateToProps = (store: AppState) => ({store})
export default connect(mapStateToProps)(Status);
