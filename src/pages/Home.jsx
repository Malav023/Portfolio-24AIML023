export default function Home() {
  const technicalSkills = ['RAG', 'Fine-tuning', 'Agentic-AI', 'MERN Stack'];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <section>
        <h2>About Me</h2>
        <p>I am a computer science student exploring modern frontend ecosystems and UI/UX mechanics.</p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h3>Core Stack</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {technicalSkills.map((skill, index) => (
            <li key={index} style={{ border: '1px solid #ccc', padding: '8px 16px', borderRadius: '4px' }}>
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}