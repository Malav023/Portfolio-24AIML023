// export default function Skills({ skillList }) {
//   return (
//     <section id="skills" style={{ padding: '40px 20px', background: '#f4f4f4', textAlign: 'center' }}>
//       <h2>My Skills</h2>
//       <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '15px' }}>
//         {skillList.map((skill, index) => (
//           <li key={index} style={{ background: '#fff', padding: '10px 20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//             {skill}
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// components/Skills.jsx
import React from 'react';

export default function Skills({ skillList }) {
  return (
    <section id="skills" style={{ padding: '40px 20px', background: '#f4f4f4', textAlign: 'center' }}>
      <h2>My Skills</h2>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {skillList.map((skill, index) => (
          <li key={index} style={{ background: '#fff', padding: '10px 20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}