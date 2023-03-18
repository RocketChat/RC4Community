'use client';

import { useMemo } from "react";
import { DiscourseClient } from "../lib";
import DiscourseContext from "./DiscourseContext";

function DiscourseProvider({host, children}){
	const discourseClient = useMemo(() => new DiscourseClient(host, {isClient: true}), [host])

	return (
		<DiscourseContext.Provider value={{discourseClient}}>
			{children}
		</DiscourseContext.Provider>
	)
}

export default DiscourseProvider;
