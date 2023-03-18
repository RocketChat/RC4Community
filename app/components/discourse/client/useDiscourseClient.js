'use client';
import { useContext } from "react";
import DiscourseClient from "../lib/DiscourseClient";
import DiscourseContext from "./DiscourseContext";

/**
 * @returns {DiscourseClient}
 */
function useDiscourseClient(){
	const { discourseClient } = useContext(DiscourseContext);

	return discourseClient;
}

export default useDiscourseClient;
