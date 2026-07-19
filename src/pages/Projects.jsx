export default function Projects() {
  const projects = [
    { title: 'Hybrid-RAG System', desc: 'A complete end-to-end RAG Pipeline for user to ask questions about their documents and the retrieved chunks will be injected along with user query to the llm context to answer the question' },
    { title: 'Email-Spam Classifier', desc: 'A minimalist Machine Learning project that classifies user mail as SPAM or HAM.' }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Projects</h2>
      {projects.map((proj, idx) => (
        <div key={idx} style={{ margin: '20px 0', padding: '15px', borderLeft: '4px solid #61dafb', background: 'rgba(0,0,0,0.02)' }}>
          <h4>{proj.title}</h4>
          <p>{proj.desc}</p>
        </div>
      ))}
    </div>
  );
}