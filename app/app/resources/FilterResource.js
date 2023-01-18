"use client"
import AllCards from '../../components/filtered-search-bar/AllCards';
import Filter from '../../components/filtered-search-bar/Filter';
import React from 'react'
import { useState } from 'react';
function FilterResource({ resource }) {
    const [filtered, setFiltered] = useState(resource);
    const [activeOption, setActiveOption] = useState("all");

    const [q, setQ] = useState("");
    const [trigger, setTrigger] = useState(true);
    const [searchParam] = useState(["name"]);

    function search(items) {
        return items?.filter((item) => {
            if (item.id > 7) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) >
                        -1
                    );
                });
            }
        });
    }
    return (
        <>
            <h1 className="flex text-white text-2xl justify-center sm:text-5xl font-bold pt-10">
                ALL RESOURCES
            </h1>
            <div className=" m-auto">
                <div className="flex md:h-12 md:mb-[2.25rem] justify-center">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="focus:outline-0 mt-5  w-64  h-8 md:mt-9 pl-2 md:w-10/11 md:h-12 sm:w-6/12"
                        placeholder="Search for..."
                        value={q}
                        onChange={(e) => {
                            setQ(e.target.value);
                            setTrigger(true);
                        }}
                    />
                </div>
                <div className="flex flex-col items-center">
                    {trigger &&
                        search(filtered)?.map((x) => {
                            return (
                                q && (
                                    <div
                                        onClick={() => {
                                            setQ(x.name);
                                            setTrigger(false);
                                        }}
                                        className=" bg-white p-1 w-64 border border-grey-600 min-h-10 md:h-8 sm:w-6/12 md:w-10/11"
                                    >
                                        {x.name}
                                    </div>
                                )
                            );
                        })}
                </div>
                <div className="flex justify-center mt-10">
                    <Filter
                        resources={resource}
                        setFiltered={setFiltered}
                        activeOption={activeOption}
                        setActiveOption={setActiveOption}
                    />
                </div>

                <div>
                    <AllCards data={filtered} search={search} />
                </div>
            </div>
        </>
    )
}

export default FilterResource