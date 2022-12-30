import AllCards from "../components/AllCards";
import Filter from "../components/Filter";

import { useState, useEffect } from "react";

export default function Home() {
  
  const resources = {
    hits: [
      {
        id: 0,
        name: "DevOps Path",
        value:
          "https://twitter.com/ghumare64/status/1537460982582128641?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "Recommended by me, If focusing on the Job Interview",
        genre: "twitter",
      },
      {
        id: 1,
        name: "DevOps Roadmap by roadmap.sh",
        value: "https://roadmap.sh/devops",
        info: "A community driven step by step guide for DevOps, SRE or any other Operations Role in 2022",
        genre: "roadmap",
      },
      {
        id: 2,
        name: "Kubernetes Resources",
        value:
          "https://twitter.com/ghumare64/status/1586751198962495489?s=20&t=oeBFJCpW8z_ZEpe1F65W8A",
        info: "Tweet thread",
        genre: "resources",
      },
      {
        id: 3,
        name: "Remote Job Path",
        value:
          "https://twitter.com/ghumare64/status/1567096152079859712?s=20&t=bTOHCdrD6epup8J2p7Fucw",
        info: "It is my experience while applying remote jobs",
        genre: "roadmap",
      },
      {
        id: 4,
        name: "DevOps Books",
        value: "https://github.com/rohitg00/DevOps_Books",
        info: "Repository created to host every free DevOps books available",
        genre: "resources",
      },
      {
        id: 5,
        name: "Resume Tips",
        value:
          "https://twitter.com/ghumare64/status/1529346650468012032?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "This tweet contains - Resume tips and my own latex  resume template",
        genre: "roadmap",
      },
      {
        id: 6,
        name: "DevOps Youtube Channels",
        value:
          "https://twitter.com/ghumare64/status/1559771038895853568?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "This tweet contains - Youtube video channels to learn DevOps free of cost.",
        genre: "resources",
      },
      {
        id: 7,
        name: "DevOps Tools",
        value:
          "https://twitter.com/ghumare64/status/1560892185842941953?s=20&t=mTInaYg86KZbVNyC865ntQ",
        info: "I personally use this DevOps tools",
        genre: "twitter",
      },
      {
        id: 8,
        name: "System Design Resources",
        value:
          "https://twitter.com/ghumare64/status/1530525871366230017?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "This tweet contains - Resources to learn System Design. \ud83e\udd16 System Design is the essential part of SDE/SRE Interviews.",
        genre: "resources",
      },
      {
        id: 9,
        name: "DevOps Projects - 1",
        value:
          "https://twitter.com/ghumare64/status/1523372831513673729?s=20&t=luieHHpWhSqkW3_Pg3VWnQ",
        info: "5 DevOps Projects that will get you a job",
        genre: "project",
      },
      {
        id: 10,
        name: "DevOps Projects - 2",
        value:
          "https://twitter.com/ghumare64/status/1546127603282710530?s=20&t=luieHHpWhSqkW3_Pg3VWnQ",
        info: '"Anna Afamefuna, Thanks for curation"',
        genre: "project",
      },
      {
        id: 11,
        name: "DevOps Resources - 1",
        value:
          "https://twitter.com/ghumare64/status/1526398860389519361?s=20&t=luieHHpWhSqkW3_Pg3VWnQ",
        info: "This is part 1 of some DevOps resources",
        genre: "resources",
      },
      {
        id: 12,
        name: "DevOps Resources - 2",
        value:
          "https://twitter.com/ghumare64/status/1528377875044663296?s=20&t=luieHHpWhSqkW3_Pg3VWnQ",
        info: "This is part 2 of some DevOps resources",
        genre: "resources",
      },
      {
        id: 13,
        name: "DevOps Resources - 3",
        value:
          "https://twitter.com/ghumare64/status/1531885835150233600?s=20&t=luieHHpWhSqkW3_Pg3VWnQ",
        info: "This is part 3 of some DevOps resources",
        genre: "resources",
      },
      {
        id: 14,
        name: "Free Courses",
        value:
          "https://twitter.com/ghumare64/status/1581497472043536385?s=20&t=k_1DZf1dgt6iU4IGIWx9zA",
        info: "DevOps, Data Science, and Python Free Courses",
        genre: "resources",
      },
      {
        id: 15,
        name: "AWS Resources",
        value: "[AWS Badges](https://aws.amazon.com/training/badges/)",
        info: "Learn AWS skills and earn AWS digital badges for FREE!",
        genre: "resources",
      },
      {
        id: 16,
        name: "Tricks to earn through DevOps",
        value:
          "https://twitter.com/ghumare64/status/1555793156847063040?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "This tweet contains - Tips and tricks to earn more than 50$/hr+ with DevOps and powerful content.",
        genre: "tips",
      },
      {
        id: 17,
        name: "Part-time Jobs",
        value:
          "https://twitter.com/ghumare64/status/1530242128139259905?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "Learn about part-time jobs in DevOps",
        genre: "twitter",
      },
      {
        id: 18,
        name: "Service Mesh",
        value:
          "https://twitter.com/ghumare64/status/1547812558295670784?s=20&t=KA45jQ2CBsyZK3wFW9zi7g",
        info: "Different resources to learn service mesh free of cost",
        genre: "resources",
      },
      {
        id: 19,
        name: "Getting Started With eBPF",
        value: "https://ebpf.io/what-is-ebpf/",
        info: "eBPF (which is no longer an acronym for anything) is a revolutionary technology with origins in the Linux kernel that can run sandboxed programs in a privileged context such as the operating system kernel.",
        genre: "resources",
      },
      {
        id: 20,
        name: "Free Introduction to GitOps",
        value: "https://bit.ly/3xKPZyi",
        info: "Linux Foundation course",
        genre: "resources",
      },
      {
        id: 21,
        name: "DevOps-The-Hard-Way-AWS",
        value: "https://buff.ly/3QxT6QE",
        info: "This repository contains free labs for setting up an entire workflow and DevOps environment from a real-world perspective in AWS",
        genre: "github",
      },
      {
        id: 22,
        name: "DevOps Exercises",
        value: "https://github.com/bregman-arie/devops-exercises",
        info: "Linux, Jenkins, AWS, SRE, Prometheus, Docker, Python, Ansible, Git, Kubernetes, Terraform, OpenStack, SQL, NoSQL, Azure, GCP, DNS, Elastic, Network, Virtualization. DevOps Interview Questions",
        genre: "resources",
      },
      {
        id: 23,
        name: "90DaysOfDevOps",
        value: "https://github.com/MichaelCade/90DaysOfDevOps",
        info: "This repository is my documenting repository for learning the world of DevOps. I started this journey on the 1st January 2022 and I plan to run to March 31st for a complete 90-day romp on spending an hour a day including weekends to get a foundational knowledge across a lot of different areas that make up DevOps.",
        genre: "github",
      },
      {
        id: 24,
        name: "Learn DevOps",
        value: "https://github.com/dwyl/learn-devops",
        info: '\ud83d\udea7 Learn the craft of "DevOps" (Developer Operations) to Deploy your App and Monitor it so it stays "Up"!',
        genre: "resources",
      },
      {
        id: 25,
        name: "Awesome Learning",
        value: "https://github.com/Lets-DevOps/awesome-learning",
        info: "A curated list for DevOps learning resources. Join the slack channel to discuss more.",
        genre: "resources",
      },
      {
        id: 26,
        name: "DevOps Academy",
        value: "https://github.com/devopsacademyau/academy",
        info: "DevOps content, classes and exercises",
        genre: "resources",
      },
      {
        id: 27,
        name: "DevOps Gitbook",
        value: "https://tkssharma-devops.gitbook.io/devops-training/",
        info: "Some curated DevOps insights",
        genre: "resources",
      },
      {
        id: 28,
        name: "Github Gists",
        value:
          "[1](https://t.co/gpWbgCKdrY) [2](https://t.co/jdQJtSYUjL) [3](https://t.co/OyObbwSbwf) [4](https://t.co/dDxC2TU0JW) [5](https://t.co/AvuBAnXzqK) [6](https://t.co/AvuBAnXzqK) [7](https://t.co/ThxJIAyM4U) [8](https://t.co/wyZ4Cg8lif) [9](https://t.co/2u83ClKLR8)",
        info: "Application Security Interview Preparation questions",
        genre: "github",
      },
      {
        id: 29,
        name: "Free e-Books",
        value: "https://bit.ly/3LfMOma",
        info: "The Container Security Book by Liz Rice",
        genre: "resources",
      },
      {
        id: 30,
        name: "Github Repos - 1",
        value: "https://bit.ly/3ypmikg",
        info: "Automated Vagrant Kubernetes Cluster Setup",
        genre: "github",
      },
      {
        id: 31,
        name: "Github Repos - 2",
        value: "https://bit.ly/3dGLCfw",
        info: "Kubetools - A Curated List of Kubernetes Tools",
        genre: "github",
      },
      {
        id: 32,
        name: "Github Repos - 3",
        value: "https://bit.ly/3Kejxa5",
        info: "System Design Primer",
        genre: "github",
      },
      {
        id: 33,
        name: "Kubernetes course by CIVO",
        value: "https://www.civo.com/academy",
        info: "Kubernetes - An orchestration tool used to manage your containers and application",
        genre: "github",
      },
      {
        id: 34,
        name: "Sample Docker Templates",
        value:
          "https://github.com/devtron-labs/devtron/tree/main/sample-docker-templates",
        info: "Devtron Sample Docker Templates - If you're exploring the docker images and stuck with the creation of dockerfiles, This resource get you covered.",
        genre: "github",
      },
      {
        id: 35,
        name: "DevOps Projects",
        value: "https://github.com/Abhinav-26/DevOps-Projects",
        info: "Curated List of DevOps Projects",
        genre: "project",
      },
    ],
    estimatedTotalHits: 66,
    query: "botman",
    limit: 20,
    offset: 0,
    processingTimeMs: 12,
  };

  const [filtered, setFiltered] = useState(resources.hits);
  const [activeOption, setActiveOption] = useState("all");

  const [q, setQ] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [searchParam] = useState(["name"]);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <div className="bg-[#1E1E1E] min-h-screen">
      <h1 className="text-white text-2xl sm:text-5xl mx-20 font-bold pt-10">
        ALL RESOURCES
      </h1>
      <div className=" m-auto">
        <div className="flex md:h-12 md:mb-[1.8rem]">
          <h1 className="text-white  mt-5 mr-2 ml-10 sm:ml-16 text-lg  md:mx-20 md:my-10 md:text-2xl">
            Search:
          </h1>

          <input
            type="search"
            name="search-form"
            id="search-form"
            className="mt-5 ml-[2px] w-64 mr-40 h-8 md:mt-9 pl-2 md:w-11/12 md:h-10 sm:w-6/12"
            placeholder="Search for..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setTrigger(true)
            }}
          />
        </div>
        <div>
          <div className="mb-5">
          {trigger && search(filtered).map((x) => {
            
            return q && <div onClick={() => {
              setQ(x.name);
              setTrigger(false)
            }} className=" bg-white w-60 p-1 border border-grey-600 mr-40 min-h-10 ml-28 pr-2 md:ml-[15.25rem] md:pl-2 md:w-2/3 lg:w-[93.8rem] md:h-8">
              {x.name}</div>;
          })}
          </div>
          
         
        </div>

        <Filter
          resources={resources.hits}
          setFiltered={setFiltered}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <div>
          <AllCards data={filtered} search={search} />
        </div>
      </div>
    </div>
  );
}
