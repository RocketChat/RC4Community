import Nav from '../../components/Hero/Nav';
import FilterResource from './FilterResource';

async function getResources() {
    const markdown_resource = await fetch(
        "https://raw.githubusercontent.com/rohitg00/DevOpsCommunity/main/README.md"
    )
    const json = []
    const markdown = await markdown_resource.text()
    let lines = markdown.split("\n");
    let i = 0;

    lines.forEach((line) => {
        let newLine = line;
        line = line.toLowerCase();
        if (line.includes("https")) {
            // paragraph
            let arr = newLine.split("|");
            if (
                line.includes("path") ||
                line.includes("course") ||
                line.includes("scholarship") ||
                line.includes("free") ||
                line.includes("roadmap") ||
                line.includes("learning") ||
                line.includes("learn") ||
                line.includes("courses") ||
                line.includes("introduction") ||
                line.includes("e-books") ||
                line.includes("exercises") ||
                line.includes("started") ||
                line.includes("gitbook")
            ) {
                json.push({
                    id: i,
                    type: "paragraph",
                    name: arr[0],
                    value: arr[1],
                    info: arr[2],
                    genre: "resources",
                });
                i++;
            } else if (line.includes("projects")) {
                json.push({
                    id: i,
                    type: "paragraph",
                    name: arr[0],
                    value: arr[1],
                    info: arr[2],
                    genre: "projects",
                });
                i++;
            } else if (
                line.includes("repos") ||
                line.includes("repository") ||
                line.includes("template")
            ) {
                json.push({
                    id: i,
                    type: "paragraph",
                    name: arr[0],
                    value: arr[1],
                    info: arr[2],
                    genre: "github",
                });
                i++;
            } else if (
                (line.includes("twitter") && line.includes("resources")) ||
                line.includes("tricks") ||
                line.includes("tools")
            ) {
                json.push({
                    id: i,
                    type: "paragraph",
                    name: arr[0],
                    value: arr[1],
                    info: arr[2],
                    genre: "twitter",
                });
                i++;
            } else {
                json.push({
                    id: i,
                    type: "paragraph",
                    text: arr,
                });
                i++;
            }
        }
    })
    return json;
}

export default async function Home() {
    const resource = await getResources();

    return (
        <div className="bg-black  min-h-screen py-6 px-5 sm:px-16 bg-[url('/elipses.png')]  bg-repeat bg-contain">
            <Nav />
            <FilterResource resource={resource} />
        </div>
    );
}

