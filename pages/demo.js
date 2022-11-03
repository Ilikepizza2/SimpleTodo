import { useEffect, useState } from "react";

export default function demo() {    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/hello");
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) return <div className="w-full h-full flex flex-col justify-center items-center p-4"><h1 className="text-4xl font-bold">Loading ...</h1></div>;
    if (error) return <div>Something went wrong: {error.message}</div>;
  return (
    <div className="w-full h-full bg-gray-300">
        <div className="w-full h-full flex flex-col justify-center items-center p-4 transition-all">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <a className="text-3xl font-bold m-10 text-green-400 hover:underline hover:text-green-600" style={{fontSize: 30, margin: 40, color: '#68d391'}} href="../">{data.name}</a>
            <p className="text-xl md:my-10 mx-4">{data.para1}</p>
            <h2 className="text-4xl font-bold">Tech Stack</h2>
            <div className="w-full  flex justify-center items-center p-4">
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Frontend</h3>
                    <p className="text-xl">{data.techStack.frontend}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Backend</h3>
                    <p className="text-xl">{data.techStack.backend}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Database</h3>
                    <p className="text-xl">{data.techStack.database}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Styling</h3>
                    <p className="text-xl">{data.techStack.styling}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">CMS</h3>
                    <p className="text-xl">{data.techStack.cms}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Deployed on</h3>
                    <p className="text-xl">{data.techStack.hosting}</p>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold">Authentication</h3>
                    <p className="text-xl">{data.techStack.auth}</p>
                </div>
            </div>

            <p className="text-xl font-bold mt-10">{data.author}</p>
            <p className="text-xl   ">{data.rollNumber}</p>
        </div>
    </div>
  )
}
