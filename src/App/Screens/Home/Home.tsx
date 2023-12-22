import React, {FC, useEffect} from 'react'
import {AppStateKeys} from "../../app.constants";
import Status, {ComponentInfo} from "../../components/Status/Status";
import {AppActionFactory, FetchState} from "../../app-store/app.action";
import {RequestMethod} from "../../app.model";
import {environment} from "../../../environments/environment";
import {store} from "../../../index";
import {Col, Row} from "antd";

export interface HomeProps {
    title: string;
}

const Home: FC<HomeProps> = () => {

    const initData = () => {
        const payload: FetchState = {
            method: RequestMethod.GET,
            url: environment.apiBasePath + '/login',
            body: {a: 'test'},
            statusId: 'TEST_STATUS',
            statusStateKeys: AppStateKeys.STATUS,
            onSuccess: () => console.log('12')
        };
        store.dispatch(AppActionFactory.fetchData(payload));

    }

    const fetchData = (res: any) => {
        initData();
    }

    const componentInfos: ComponentInfo[] = [
        {
            componentId: 'TEST_STATUS',
            callback: fetchData.bind(this)
        }
    ];

    useEffect(() => {
        initData();
    }, []);

    return <React.Fragment>
        <Row gutter={16}>
            <Col span={12}>
                <div className="position-relative frame-border">
                    <Status statusStateKeys={AppStateKeys.STATUS} componentInfos={componentInfos} showOverlay={true}>This is a Test Holder</Status>
                </div>
            </Col>
        </Row>
    </React.Fragment>
}

export default Home;
