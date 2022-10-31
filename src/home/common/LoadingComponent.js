import React from "react";


const LoadingComponent = props => {
  
    const loading = props.loading;    

    return (
        <>
            {loading === false ? "" :
							<div className="loading rotate">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
            }
        </>
    )
}

export default LoadingComponent