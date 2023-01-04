import AllCards from '../../components/filtered-search-bar/AllCards';
import Filter from '../../components/filtered-search-bar/Filter';
import { useState, useEffect } from 'react';

export default function Home() {
  const [resource, setresource] = useState();

  useEffect(() => {
    const json = [];
    fetch('https://raw.githubusercontent.com/rohitg00/DevOpsCommunity/main/README.md')
      .then((response) => response.text())
      .then((markdown) => {
        let lines = markdown.split('\n');
        let i = 0;

        lines.forEach((line) => {
          let newLine = line;
          line = line.toLowerCase();
          if (line.includes('https')) {
            // paragraph
            let arr = newLine.split('|');
            if (
              line.includes('path') ||
              line.includes('course') ||
              line.includes('scholarship') ||
              line.includes('free') ||
              line.includes('roadmap') ||
              line.includes('learning') ||
              line.includes('learn') ||
              line.includes('courses') ||
              line.includes('introduction') ||
              line.includes('e-books') ||
              line.includes('exercises') ||
              line.includes('started') ||
              line.includes('gitbook')
            ) {
              json.push({
                id: i,
                type: 'paragraph',
                name: arr[0],
                value: arr[1],
                info: arr[2],
                genre: 'resources',
              });
              i++;
            } else if (line.includes('projects')) {
              json.push({
                id: i,
                type: 'paragraph',
                name: arr[0],
                value: arr[1],
                info: arr[2],
                genre: 'projects',
              });
              i++;
            } else if (
              line.includes('repos') ||
              line.includes('repository') ||
              line.includes('template')
            ) {
              json.push({
                id: i,
                type: 'paragraph',
                name: arr[0],
                value: arr[1],
                info: arr[2],
                genre: 'github',
              });
              i++;
            } else if (
              (line.includes('twitter') && line.includes('resources')) ||
              line.includes('tricks') ||
              line.includes('tools')
            ) {
              json.push({
                id: i,
                type: 'paragraph',
                name: arr[0],
                value: arr[1],
                info: arr[2],
                genre: 'twitter',
              });
              i++;
            } else {
              json.push({
                id: i,
                type: 'paragraph',
                text: arr,
              });
              i++;
            }
          }
        });

        // console.log("first render ------------------------------------");
        // console.log("json")
        // console.log(json)
        setresource(json);
      });
  }, []);
  // console.log("resources")
  // console.log(resource);

  const [filtered, setFiltered] = useState(resource);
  const [activeOption, setActiveOption] = useState('all');

  const [q, setQ] = useState('');
  const [trigger, setTrigger] = useState(true);
  const [searchParam] = useState(['name']);

  function search(items) {
    return items?.filter((item) => {
      return searchParam.some((newItem) => {
        return item[newItem]?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
    });
  }
  if (resource) {
    return (
      <div className='bg-[#1E1E1E] min-h-screen'>
        <h1 className='text-white text-2xl sm:text-5xl mx-20 font-bold pt-10'>ALL RESOURCES</h1>
        <div className=' m-auto'>
          <div className='flex md:h-12 md:mb-[1.8rem]'>
            <h1 className='text-white  mt-5 mr-2 ml-10 sm:ml-16 text-lg  md:mx-20 md:my-10 md:text-2xl'>
              Search:
            </h1>

            <input
              type='search'
              name='search-form'
              id='search-form'
              className='mt-5 ml-[2px] w-64 mr-40 h-8 md:mt-9 pl-2 md:w-11/12 md:h-10 sm:w-6/12'
              placeholder='Search for...'
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setTrigger(true);
              }}
            />
          </div>
          <div>
            <div className='mb-5'>
              {trigger &&
                search(filtered)?.map((x) => {
                  return (
                    q && (
                      <div
                        onClick={() => {
                          setQ(x.name);
                          setTrigger(false);
                        }}
                        className=' bg-white w-60 p-1 border border-grey-600 mr-40 min-h-10 ml-28 pr-2 md:ml-[15.25rem] md:pl-2 md:w-2/3 lg:w-[93.8rem] md:h-8'
                      >
                        {x.name}
                      </div>
                    )
                  );
                })}
            </div>
          </div>

          <Filter
            resources={resource}
            setFiltered={setFiltered}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
          />
          <div>
            <AllCards
              data={filtered}
              search={search}
            />
          </div>
        </div>
      </div>
    );
  }
}
