'use client';

import { useMemo } from "react";
import { DiscourseClient } from "../lib";
import DiscourseContext from "./DiscourseContext";

function DiscourseProvider({host, discourseClient, children}){

  const _discourseClient = useMemo(() => {
    return (discourseClient || new DiscourseClient(host, { isClient: true }));
  }, [host, discourseClient]);

	return (
		<DiscourseContext.Provider value={{discourseClient: _discourseClient}}>
			{children}
		</DiscourseContext.Provider>
	)
}

export default DiscourseProvider;
