import {FC} from "react";

export interface RetryComponentProps {
    message: string;
    errorId: string;
    isShowRetry: boolean;
    errorClass: string;
    detailMessage: string;
    retryRequest: () => any;
}

const Retry: FC<RetryComponentProps> = ({message, errorId, isShowRetry, errorClass = '', detailMessage, retryRequest }) => {

    return <>
        {

            errorId != null
                ? <>
                    <p>The application was unable to return the data you requested at this time</p>
                    <p>Please Try again later. If the request for this data continues to be unsuccessful, contact your client service Representative with the below
                        error information</p>
                    <p><strong>Error Id: {errorId}</strong></p>
                </>
                : <>
                    {
                        isShowRetry
                            ? <>
                                <div className={'has-error ' + errorClass}>
                                    <span>Error: </span>
                                    {message}
                                    <a onClick={retryRequest}>Retry</a>
                                </div>
                            </>
                            : <>
                                <div className={'has-error ' + errorClass}>
                                    {message && message.length !== 0 ? (detailMessage !== '' ? message + ' (' + detailMessage + ')' : message + '.') : 'Something went wrong!. Please retry .'}
                                </div>
                            </>
                    }
                </>
        }
    </>
}

export default Retry;
