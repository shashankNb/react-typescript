import {FC} from "react";
import './Loading.scss';

const Loading: FC<{}> = () => {
    return (
        <div id="overlay">
            <div id="overlay-content">
                <div className="loader"></div>
            </div>
        </div>
    )

}
export default Loading;
