import React , {useState} from "react";

export default function DashboardList(props) {
    const [deviceCode , setDeviceCode] = useState(props.deviceCode)

    console.log(props)
    return (
        <>
            <div>{deviceCode}</div>
        </>
    )
}