import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


const LoadingComponent = props => {
  
    const loading = props.loading;    

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