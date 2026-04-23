import { useState } from 'react'
import { quizData } from './questions'

function App() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userSelection, setUserSelection] = useState(null); // كيعقل على اختيار المستخدم
  const [isCorrect, setIsCorrect] = useState(null); // واش الجواب صحيح

  const handleAnswer = (option) => {
    if (userSelection) return; // كيمنع الكليك المكرر

    setUserSelection(option);
    const correct = option === quizData[selectedUnit][currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setUserSelection(null);
    setIsCorrect(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData[selectedUnit].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (!selectedUnit) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '20px', textAlign: 'center', direction: 'rtl' }}>
        <h1 style={{ color: '#38bdf8' }}>مراجعة الفيزياء - باك 2026 🎓</h1>
        <div style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: '40px auto' }}>
          {Object.keys(quizData).map(unit => (
            <button key={unit} onClick={() => setSelectedUnit(unit)} style={{ padding: '20px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #38bdf8', borderRadius: '12px', cursor: 'pointer' }}>
              {unit}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = quizData[selectedUnit][currentQuestion];

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '20px', direction: 'rtl' }}>
      {showScore ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>النتيجة: {score} / {quizData[selectedUnit].length}</h2>
          <button onClick={() => window.location.reload()} style={{ padding: '15px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '8px' }}>إعادة</button>
        </div>
      ) : (
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px' }}>
          <small>{selectedUnit} - {currentQuestion + 1}/{quizData[selectedUnit].length}</small>
          <h2 style={{ margin: '20px 0' }}>{currentQ.question}</h2>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {currentQ.options.map((option) => {
              let bgColor = '#334155';
              if (userSelection) {
                if (option === currentQ.answer) bgColor = '#10b981'; // أخضر للجواب الصحيح
                else if (option === userSelection) bgColor = '#ef4444'; // أحمر للجواب الغلط
              }

              return (
                <button 
                  key={option} 
                  onClick={() => handleAnswer(option)}
                  disabled={!!userSelection}
                  style={{ padding: '15px', textAlign: 'right', backgroundColor: bgColor, color: 'white', border: 'none', borderRadius: '10px', transition: '0.3s' }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {userSelection && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ color: isCorrect ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                {isCorrect ? '✅ برافو! جواب صحيح' : `❌ غلط! الجواب الصحيح هو: ${currentQ.answer}`}
              </p>
              <button onClick={handleNext} style={{ marginTop: '10px', padding: '10px 30px', backgroundColor: '#38bdf8', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                السؤال التالي ➡️
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
