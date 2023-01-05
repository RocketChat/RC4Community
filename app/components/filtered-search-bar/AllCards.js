import React from "react";
import Card from "./Card";
import {motion} from "framer-motion"


function AllCards({ data,search }) {
  return (
    <motion.div layout className="grid place-items-center grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3 md:mt-10 md:pb-10">
    
      {search(data)?.map((x) => {
        if(x.id>7){
          return <Card name={x.name} info={x.info} key={x.id} value={x.value}/>;
        }
      })}
    </motion.div>
  );
}

export default AllCards;

