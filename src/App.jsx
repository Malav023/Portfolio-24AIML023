import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

export default function App() {
  const technicalSkills = ['RAG', 'Fine-tuning', 'Agentic-AI', 'MERN Stack'];
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0 }}>
      <Header />
      
      <main>
        <About />
        <Skills skillList={technicalSkills} />
      </main>
      
      <Footer year={currentYear} />
    </div>
  );
}