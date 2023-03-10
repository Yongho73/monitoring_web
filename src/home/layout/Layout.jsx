import React from "react";
import Header from "./Header";
import Left from './Left'
import HomePage from "../HomePage";
import '../static/css/common.css'

const Layout = () => {
	return (
		<>
			<Left/>
			<Header/>                
			<main><HomePage/></main> {/* 이 부분이 하위 Route에 매핑된 컴포넌트(page1, page2)로 치환됨 */}                
		</>
					
	)
}

export default Layout;