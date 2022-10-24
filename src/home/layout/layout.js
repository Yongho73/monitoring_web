import React from "react";
import Header from "./header";
import Left from './left'
import HomePage from "../HomePage";

const Layout = () => {
    return (
        <div className="wrap">
        <div className="container">
            <div className="left_area">
                <Left/>
            </div>
            <div className="right_area">
                <Header/>                
                <main><HomePage/></main> {/* 이 부분이 하위 Route에 매핑된 컴포넌트(page1, page2)로 치환됨 */}                
            </div>
        </div>
    </div>
    )
}

export default Layout;