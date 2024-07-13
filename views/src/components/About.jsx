export default function About() {
  return (
    <div className="about-page">
      <p className="about-title">About This App</p>
      <p className="about-techStack">
        <b>
          TechStack: React.js, Node.js, Express, MongoDB, JavaScript, HTML, CSS.
        </b>
        <br />
        This App Uses Server-less Authentication <b>JWT,</b> Password Encryption
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        using Bcrypt JS. <b>RestFul API's</b> Concept
        <br />
        Uses <b>React Router</b> for seamlessly switching between pages.
      </p>
      <p>
        <b>About App: </b>A Job Creating, Searching App for recruters. With
        Multiples features like New job Creation, Job Edit (UPDATE), Deletion.
        <br />
        Personal Information can also be updated.
      </p>
      <p><b>Next Steps: </b>Create app for job seekers so they can search and apply for a job.
      <br/> </p>
    </div>
  );
}
