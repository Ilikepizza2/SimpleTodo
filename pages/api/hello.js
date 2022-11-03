// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res
    .status(200)
    .json({
      title: "My over-engineered project",
      name: "Todo app",
      para1: "My first personal project like many others, was a simple todo list. So for this event, I am trying to over engineer that small application as much as possible. The project is based on NextJS. I have implemented the auth using a FOSS alternative to firebase, used tailwind css for styling and used sanity cms service for storing and displaying the todos. Even the content of this page is fetched from an api made and hosted within this website. The website is hosted on vercel.",
      techStack: {
        frontend: "NextJS",
        backend: "NodeJS",
        database: "Sanity CMS",
        styling: "TailwindCSS",
        cms: "Sanity CMS",
        hosting: "Vercel",
        auth: "Supabase",
      },
      author: "Om Srivastava",
      rollNumber: "LIT2021010",
    });
}
