import React from "react";
import {useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";


const LoadingComponent = () => {
    const {loading} = useSelector((state:RootState) => state.global);


    return (
        <>
            {loading === false ? "" :
                <>
                    <div className={"globalLoadingBackground"}>
                    </div>
                    <div className={"globalLoadingIcon"}>
                        <div className={"iconArea"}>
                            <CircularProgress />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default LoadingComponent