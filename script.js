async function flipCoin() {
    const button = document.querySelector('button');
    const coin = document.querySelector('.coin');
    const quantumState = document.getElementById('quantumState');
    
    // Disable button during flip
    button.disabled = true;
    
    // Clear and prepare quantum state display
    quantumState.innerHTML = `
        <div class="fade-in" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: left;">
            <div id="initial-state">
                <div style="color: #00ffff; margin-bottom: 10px">Initial State:</div>
                <div style="font-family: monospace;">|ψ⟩ = |0⟩</div>
            </div>
            <div id="superposition-state" style="opacity: 0">
                <div style="color: #00ffff; margin-bottom: 10px">Superposition:</div>
                <div style="font-family: monospace;">H|0⟩ → |ψ⟩ = (|H⟩ + |T⟩)/√2</div>
                <div style="font-size: 0.8em; margin-top: 5px">Both heads and tails at once!</div>
            </div>
            <div id="final-state" style="opacity: 0">
                <div style="color: #00ffff; margin-bottom: 10px">Measurement:</div>
                <div id="measurement-result"></div>
            </div>
        </div>
    `;
    
    // Add circuit diagram
    const circuitDiagram = document.getElementById('circuitDiagram');
    circuitDiagram.innerHTML = `
        <svg width="400" height="100" viewBox="0 0 400 100">
            <line class="quantum-wire" x1="50" y1="50" x2="350" y2="50" />
            <text x="30" y="55" fill="white">|0⟩</text>
            <rect class="gate" x="100" y="35" width="30" height="30" />
            <text x="108" y="55" fill="white">H</text>
            <g class="parallel-universe">
                <line class="parallel-lines" x1="150" y1="30" x2="250" y2="30" />
                <line class="parallel-lines" x1="150" y1="70" x2="250" y2="70" />
                <text x="180" y="25" fill="#00ffff" font-size="12">|H⟩</text>
                <text x="180" y="90" fill="#00ffff" font-size="12">|T⟩</text>
            </g>
            <path class="measurement" d="M270,35 L290,35 L290,65 L270,65 Z" />
            <text x="320" y="55" fill="white" id="measurementText">?</text>
        </svg>
    `;
    circuitDiagram.style.opacity = '1';
    
    await new Promise(resolve => setTimeout(resolve, 800));
    document.getElementById('superposition-state').style.opacity = '1';

    coin.classList.add('flipping');
    
    try {
        const circuit = new QuantumCircuit(1);
        circuit.addGate("h", 0, [0]);
        circuit.run();
        const measurement = circuit.measure(0);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const finalState = document.getElementById('final-state');
        const measurementResult = document.getElementById('measurement-result');
        finalState.style.opacity = '1';
        
        if (measurement === 0) {
            measurementResult.innerHTML = `<div style="color: #00ff00">Heads!</div><div style="font-size: 0.8em">State: |H⟩</div>`;
            coin.style.transform = 'rotateY(0deg)';
            document.getElementById('measurementText').textContent = 'H';
        } else {
            measurementResult.innerHTML = `<div style="color: #00ff00">Tails!</div><div style="font-size: 0.8em">State: |T⟩</div>`;
            coin.style.transform = 'rotateY(180deg)';
            document.getElementById('measurementText').textContent = 'T';
        }
    } catch (error) {
        quantumState.textContent = "Error: " + error.message;
    }
    
    setTimeout(() => {
        circuitDiagram.style.opacity = '0';
    }, 2000);
    
    coin.classList.remove('flipping');
    button.disabled = false;
}
