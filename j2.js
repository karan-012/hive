// Get the form element and listen for a submit event
var form = document.getElementById("gene-prediction-form");
form.addEventListener("submit", function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the DNA sequence input element and the result element
  var dnaInput = document.getElementById("dna-sequence-input");
  var resultElement = document.getElementById("gene-prediction-result");

  // Get the DNA sequence value from the input element
  var dnaSequence = dnaInput.value.trim();

  // Validate the DNA sequence (must contain only A, T, C, or G)
  var validSequence = /^[ATCG]+$/.test(dnaSequence);
  if (!validSequence) {
    resultElement.textContent = "Invalid DNA sequence. Please enter a sequence containing only A, T, C, or G.";
    return;
  }

  // Predict the genes in the DNA sequence
  var genes = predictGenes(dnaSequence);

  // If no genes were found, display a message to the user
  if (genes.length === 0) {
    resultElement.textContent = "No genes were found in the DNA sequence.";
    return;
  }

  // If genes were found, display them in the result element
  resultElement.innerHTML = "The following genes were found in the DNA sequence:<br>";
  for (var i = 0; i < genes.length; i++) {
    resultElement.innerHTML += genes[i] + "<br>";
  }
});

// Gene prediction algorithm
function predictGenes(dnaSequence) {
  // Remove any non-ATCG characters from the DNA sequence
  dnaSequence = dnaSequence.replace(/[^ATCG]/gi, "");

  // Split the DNA sequence into codons (groups of three nucleotides)
  var codons = [];
  for (var i = 0; i < dnaSequence.length; i += 3) {
    codons.push(dnaSequence.substr(i, 3));
  }

  // Find the start codon (ATG)
  var startIndex = codons.indexOf("ATG");

  // If there is no start codon, return an empty array
  if (startIndex === -1) {
    return [];
  }

  // Find the end codons (TAA, TAG, TGA)
  var endCodons = ["TAA", "TAG", "TGA"];
  var endIndex = -1;
  for (var i = startIndex + 1; i < codons.length; i++) {
    if (endCodons.indexOf(codons[i]) !== -1) {
      endIndex = i;
      break;
    }
  }

  // If there is no end codon, return an empty array
  if (endIndex === -1) {
    return [];
  }

  // Extract the gene from the codons between the start and end codons
  var gene = codons.slice(startIndex, endIndex + 1).join("");

  // Recursively predict any remaining genes in the DNA sequence
  var remainingSequence = dnaSequence.substr((endIndex + 1) * 3);
  var remainingGenes = predictGenes(remainingSequence);

  // Return the gene and any remaining genes found in the DNA sequence
  return [gene].concat(remainingGenes);
}
