{/* Progress Bar */}
<div style={{ 
  width: '100%', 
  backgroundColor: '#334155', 
  borderRadius: '10px', 
  height: '8px', 
  marginBottom: '20px',
  overflow: 'hidden'
}}>
  <div style={{ 
    width: `${((currentQuestion) / quizData[selectedUnit].length) * 100}%`, 
    backgroundColor: '#38bdf8', 
    height: '100%', 
    transition: '0.5s' 
  }}></div>
</div>
