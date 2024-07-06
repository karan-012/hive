// Select elements
const predictButton = document.getElementById("predict-button");
const blastButton = document.getElementById("blast-button");
const loadingIndicator = document.getElementById("loading-indicator");
const predictionResults = document.getElementById("prediction-results");
const blastResults = document.getElementById("blast-results");

// Add event listeners
predictButton.addEventListener("click", predictGenes);
blastButton.addEventListener("click", runBlast);

// Function to predict genes
function predictGenes() {
	// Get sequence from textarea
	const sequence = document.getElementById("sequence").value;
	
	// Show loading indicator and hide prediction results
	loadingIndicator.style.display = "block";
	predictionResults.style.display = "none";
	
	// Simulate prediction process with a delay
	setTimeout(() => {
		// Generate some fake results
		const results = [
			{ geneId: "ABC123", start: 100, end: 200, strand: "+" },
			{ geneId: "DEF456", start: 300, end: 400, strand: "-" },
			{ geneId: "GHI789", start: 500, end: 600, strand: "+" }
		];
		
		// Create table rows for results
		const rows = results.map(result => {
			return `<tr><td>${result.geneId}</td><td>${result.start}</td><td>${result.end}</td><td>${result.strand}</td></tr>`;
		});
		
		// Update prediction results table
		const table = predictionResults.querySelector("table");
		table.innerHTML += rows.join("");
		
		// Hide loading indicator and show prediction results
		loadingIndicator.style.display = "none";
		predictionResults.style.display = "block";
	}, 2000); // Change delay time as needed
}

// Function to run BLAST
function runBlast() {
	// Get sequence from textarea
	const sequence = document.getElementById("sequence").value;
	
	// Show loading indicator and hide BLAST results
	loadingIndicator.style.display = "block";
	blastResults.style.display = "none";
	
	// Simulate BLAST process with a delay
	setTimeout(() => {
		// Generate some fake results
		const results = [
			{ hitId: "XYZ789", score: 90, eValue: 0.01 },
			{ hitId: "LMN456", score: 80, eValue: 0.05 },
			{ hitId: "PQR123", score: 70, eValue: 0.1 }
		];
		
		// Create table rows for results
		const rows = results.map(result => {
			return `<tr><td>${result.hitId}</td><td>${result.score}</td><td>${result.eValue}</td></tr>`;
		});
		
		// Update BLAST results table
		const table = blastResults.querySelector("table");
		table.innerHTML += rows.join("");
		
		// Hide loading indicator and show BLAST results
		loadingIndicator.style.display = "none";
		blastResults.style.display = "block";
	}, 3000); // Change delay time as needed
}
